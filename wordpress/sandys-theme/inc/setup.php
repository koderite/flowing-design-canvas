<?php
/**
 * One-time setup when the theme is switched on, and tidy-up when switched off.
 *
 * On activation: uploads the logo as the Site Logo, creates a "Home" page filled
 * with the homepage sections and makes it the front page. The previous front
 * page settings are remembered and put back if another theme is chosen.
 *
 * @package sandys
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Copy a bundled image into the Media Library once.
 *
 * @param string $file  File in assets/images.
 * @param string $title Media title.
 * @return int Attachment ID or 0.
 */
function sandys_import_image( $file, $title ) {
	$existing = get_posts(
		array(
			'post_type'   => 'attachment',
			'meta_key'    => '_sandys_source',
			'meta_value'  => $file,
			'numberposts' => 1,
			'fields'      => 'ids',
		)
	);
	if ( $existing ) {
		return (int) $existing[0];
	}
	$path = get_theme_file_path( 'assets/images/' . $file );
	if ( ! file_exists( $path ) ) {
		return 0;
	}
	$upload = wp_upload_bits( $file, null, file_get_contents( $path ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}
	$type = wp_check_filetype( $upload['file'] );
	$id   = wp_insert_attachment(
		array(
			'post_mime_type' => $type['type'],
			'post_title'     => $title,
			'post_status'    => 'inherit',
		),
		$upload['file']
	);
	if ( is_wp_error( $id ) || ! $id ) {
		return 0;
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $upload['file'] ) );
	update_post_meta( $id, '_sandys_source', $file );
	return (int) $id;
}

/**
 * Activation: logo, Home page, front page setting.
 */
function sandys_on_activate() {
	if ( ! get_theme_mod( 'custom_logo' ) ) {
		$logo = sandys_import_image( 'sandys-logo.png', 'Sandy’s Plumbing logo' );
		if ( $logo ) {
			set_theme_mod( 'custom_logo', $logo );
		}
	}

	$home_id = (int) get_option( 'sandys_home_page' );
	if ( ! $home_id || ! get_post( $home_id ) || 'trash' === get_post_status( $home_id ) ) {
		$pattern = WP_Block_Patterns_Registry::get_instance()->get_registered( 'sandys/home' );
		if ( ! $pattern ) {
			return;
		}
		$home_id = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Home',
				'post_name'    => 'home',
				'post_content' => $pattern['content'],
			)
		);
		if ( is_wp_error( $home_id ) || ! $home_id ) {
			return;
		}
		update_option( 'sandys_home_page', $home_id );
	}

	if ( false === get_option( 'sandys_previous_front' ) ) {
		update_option(
			'sandys_previous_front',
			array(
				'show_on_front' => get_option( 'show_on_front' ),
				'page_on_front' => get_option( 'page_on_front' ),
			)
		);
	}
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $home_id );
}
// Patterns register on init, so run activation after that.
add_action(
	'after_switch_theme',
	function () {
		if ( did_action( 'init' ) ) {
			sandys_on_activate();
		} else {
			add_action( 'init', 'sandys_on_activate', 99 );
		}
	}
);

/**
 * Deactivation: restore the old front page choice. The Home page is kept.
 */
function sandys_on_deactivate() {
	$prev = get_option( 'sandys_previous_front' );
	if ( is_array( $prev ) ) {
		update_option( 'show_on_front', $prev['show_on_front'] );
		update_option( 'page_on_front', $prev['page_on_front'] );
		delete_option( 'sandys_previous_front' );
	}
}
add_action( 'switch_theme', 'sandys_on_deactivate' );
