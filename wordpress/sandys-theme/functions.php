<?php
/**
 * Sandy's Plumbing & Drainage theme setup.
 *
 * @package sandys
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SANDYS_VERSION', wp_get_theme( get_template() )->get( 'Version' ) );

require_once get_template_directory() . '/inc/enquiries.php';
require_once get_template_directory() . '/inc/setup.php';

/**
 * Theme supports and editor styles.
 */
function sandys_after_setup() {
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );
	add_theme_support( 'custom-logo', array( 'height' => 100, 'width' => 412, 'flex-width' => true, 'flex-height' => true ) );
}
add_action( 'after_setup_theme', 'sandys_after_setup' );

/**
 * Front-end styles and scripts.
 */
function sandys_assets() {
	wp_enqueue_style( 'sandys-style', get_stylesheet_uri(), array(), SANDYS_VERSION );
	wp_enqueue_script( 'sandys-site', get_theme_file_uri( 'assets/js/site.js' ), array(), SANDYS_VERSION, array( 'in_footer' => true, 'strategy' => 'defer' ) );
}
add_action( 'wp_enqueue_scripts', 'sandys_assets' );

/**
 * Flag JavaScript early so scroll animations never flash content.
 */
function sandys_js_flag() {
	echo "<script>document.documentElement.classList.add('sp-js');</script>\n";
}
add_action( 'wp_head', 'sandys_js_flag', 1 );

/**
 * Pattern category and block styles the editor offers.
 */
function sandys_register_editor_bits() {
	register_block_pattern_category( 'sandys', array( 'label' => __( 'Sandy’s sections', 'sandys' ) ) );

	register_block_style( 'core/button', array( 'name' => 'sp-amber', 'label' => __( 'Amber pill', 'sandys' ) ) );
	register_block_style( 'core/button', array( 'name' => 'sp-ghost-dark', 'label' => __( 'Outline on dark', 'sandys' ) ) );
	register_block_style( 'core/button', array( 'name' => 'sp-ghost-light', 'label' => __( 'Outline on light', 'sandys' ) ) );
	register_block_style( 'core/paragraph', array( 'name' => 'sp-eyebrow', 'label' => __( 'Small label with line', 'sandys' ) ) );
	register_block_style( 'core/paragraph', array( 'name' => 'sp-link-arrow', 'label' => __( 'Link with arrow', 'sandys' ) ) );
	register_block_style( 'core/list', array( 'name' => 'sp-checklist', 'label' => __( 'Ticked list', 'sandys' ) ) );
	register_block_style( 'core/separator', array( 'name' => 'sp-draw', 'label' => __( 'Line that draws in', 'sandys' ) ) );
}
add_action( 'init', 'sandys_register_editor_bits' );

/**
 * Helper used by patterns for bundled images.
 *
 * @param string $file File name inside assets/images.
 */
function sandys_img( $file ) {
	return esc_url( get_theme_file_uri( 'assets/images/' . $file ) );
}

/**
 * Helper used by patterns for on-page anchors that also work from inner pages.
 *
 * @param string $hash Anchor without the #.
 */
function sandys_anchor( $hash ) {
	return esc_url( home_url( '/#' . $hash ) );
}
