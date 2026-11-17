<?php
/**
 * Quick enquiry form: [sandys_enquiry_form] shortcode, handler, email and
 * an "Enquiries" list in the dashboard so no enquiry is lost if email fails.
 *
 * Where enquiries are emailed: Settings > General > "Enquiry email".
 *
 * @package sandys
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SANDYS_DEFAULT_SERVICES = 'Blocked drain · emergency|Blocked drains & emergency clearance|CCTV drain surveys|Drain excavation & repair|Water mains & lead pipe replacement|Leak detection & repair|Something else';

/**
 * Private post type that stores every enquiry.
 */
function sandys_register_enquiries() {
	register_post_type(
		'sandys_enquiry',
		array(
			'labels'          => array(
				'name'          => __( 'Enquiries', 'sandys' ),
				'singular_name' => __( 'Enquiry', 'sandys' ),
				'menu_name'     => __( 'Enquiries', 'sandys' ),
				'edit_item'     => __( 'Enquiry', 'sandys' ),
				'not_found'     => __( 'No enquiries yet.', 'sandys' ),
			),
			'public'          => false,
			'show_ui'         => true,
			'show_in_menu'    => true,
			'menu_position'   => 25,
			'menu_icon'       => 'dashicons-email-alt',
			'supports'        => array( 'title', 'editor' ),
			'capability_type' => 'post',
			'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap'    => true,
		)
	);
}
add_action( 'init', 'sandys_register_enquiries' );

/**
 * Extra columns on the Enquiries list.
 */
add_filter(
	'manage_sandys_enquiry_posts_columns',
	function ( $cols ) {
		return array(
			'cb'            => $cols['cb'],
			'title'         => __( 'Name', 'sandys' ),
			'sandys_phone'  => __( 'Phone', 'sandys' ),
			'sandys_email'  => __( 'Email', 'sandys' ),
			'sandys_need'   => __( 'Needs', 'sandys' ),
			'sandys_mailed' => __( 'Emailed', 'sandys' ),
			'date'          => __( 'Received', 'sandys' ),
		);
	}
);
add_action(
	'manage_sandys_enquiry_posts_custom_column',
	function ( $col, $post_id ) {
		$map = array(
			'sandys_phone' => '_phone',
			'sandys_email' => '_email',
			'sandys_need'  => '_service',
		);
		if ( isset( $map[ $col ] ) ) {
			echo esc_html( get_post_meta( $post_id, $map[ $col ], true ) );
		} elseif ( 'sandys_mailed' === $col ) {
			echo get_post_meta( $post_id, '_mailed', true ) ? esc_html__( 'Yes', 'sandys' ) : '<strong style="color:#d63330">' . esc_html__( 'Failed', 'sandys' ) . '</strong>';
		}
	},
	10,
	2
);

/**
 * "Enquiry email" field under Settings > General.
 */
function sandys_settings_field() {
	register_setting(
		'general',
		'sandys_enquiry_email',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_email',
			'default'           => '',
		)
	);
	add_settings_field(
		'sandys_enquiry_email',
		__( 'Enquiry email', 'sandys' ),
		function () {
			$val = get_option( 'sandys_enquiry_email', '' );
			printf(
				'<input type="email" class="regular-text" name="sandys_enquiry_email" id="sandys_enquiry_email" value="%s" placeholder="%s" /><p class="description">%s</p>',
				esc_attr( $val ),
				esc_attr( get_option( 'admin_email' ) ),
				esc_html__( 'Where the website’s quick enquiry form is sent. Leave blank to use the Administration Email Address.', 'sandys' )
			);
		},
		'general',
		'default',
		array( 'label_for' => 'sandys_enquiry_email' )
	);
}
add_action( 'admin_init', 'sandys_settings_field' );

/**
 * Inline SVG icons used by the form.
 *
 * @param string $name Icon name.
 */
function sandys_icon( $name ) {
	$icons = array(
		'arrow'   => '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'chevron' => '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		'shield'  => '<svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1.2 10.2 3v3.1c0 2.4-1.7 4.1-4.2 4.7C3.5 10.2 1.8 8.5 1.8 6.1V3L6 1.2Z" stroke="currentColor"/><path d="m4.2 6 1.3 1.3 2.3-2.4" stroke="currentColor"/></svg>',
		'check'   => '<svg width="20" height="20" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m1.8 6.2 2.6 2.6L10.2 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	);
	return $icons[ $name ] ?? '';
}

/**
 * The form. Attributes:
 *   phone    - number shown in the thank-you message
 *   services - options for "What do you need?", separated by |
 *
 * @param array $atts Shortcode attributes.
 */
function sandys_enquiry_form_shortcode( $atts ) {
	$atts     = shortcode_atts(
		array(
			'phone'    => '07754 179130',
			'services' => SANDYS_DEFAULT_SERVICES,
		),
		$atts,
		'sandys_enquiry_form'
	);
	$services = array_filter( array_map( 'trim', explode( '|', $atts['services'] ) ) );
	$tel      = 'tel:' . preg_replace( '/[^0-9+]/', '', preg_replace( '/^0/', '+44', $atts['phone'] ) );
	$sent     = isset( $_GET['enquiry'] ) && 'sent' === $_GET['enquiry']; // phpcs:ignore WordPress.Security.NonceVerification
	$failed   = isset( $_GET['enquiry'] ) && 'error' === $_GET['enquiry']; // phpcs:ignore WordPress.Security.NonceVerification

	ob_start();
	?>
	<div class="sp-enquiry<?php echo $sent ? ' is-sent' : ''; ?>">
		<form class="sp-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" novalidate>
			<input type="hidden" name="action" value="sandys_enquiry" />
			<input type="hidden" name="sp_t" value="<?php echo esc_attr( time() ); ?>" />
			<input type="hidden" name="sp_back" value="" />
			<div class="sp-hp" aria-hidden="true"><label>Leave this empty <input type="text" name="sp_company" tabindex="-1" autocomplete="off" /></label></div>
			<div class="sp-form-grid">
				<label class="sp-field"><span class="sp-field-label">Your name</span><input class="sp-input" name="name" type="text" placeholder="Jane Whitfield" autocomplete="name" /><span class="sp-field-error"><span></span></span></label>
				<label class="sp-field"><span class="sp-field-label">Phone</span><input class="sp-input" name="phone" type="tel" placeholder="07700 900 123" autocomplete="tel" /><span class="sp-field-error"><span></span></span></label>
			</div>
			<label class="sp-field"><span class="sp-field-label">Email</span><input class="sp-input" name="email" type="email" placeholder="jane@example.co.uk" autocomplete="email" /><span class="sp-field-error"><span></span></span></label>
			<label class="sp-field"><span class="sp-field-label">What do you need?</span>
				<span class="sp-select-wrap"><select class="sp-input" name="service">
					<?php foreach ( $services as $s ) : ?>
						<option value="<?php echo esc_attr( $s ); ?>"><?php echo esc_html( $s ); ?></option>
					<?php endforeach; ?>
				</select><?php echo sandys_icon( 'chevron' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			</label>
			<label class="sp-field"><span class="sp-field-label">Message</span><textarea class="sp-input sp-textarea" name="message" rows="4" placeholder="Where is the problem, and when did it start?"></textarea></label>
			<button type="submit" class="sp-submit"><span class="sp-submit-label">Send enquiry <?php echo sandys_icon( 'arrow' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span><span class="sp-submit-busy"><span class="sp-spinner"></span>Sending</span></button>
			<p class="sp-form-error" role="alert"<?php echo $failed ? '' : ' hidden'; ?>>Sorry, that didn’t send. Please try again or call <a href="<?php echo esc_attr( $tel ); ?>"><?php echo esc_html( $atts['phone'] ); ?></a>.</p>
			<p class="sp-privacy"><?php echo sandys_icon( 'shield' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>Your details stay with us. No marketing lists.</p>
		</form>
		<div class="sp-sent" role="status">
			<span class="sp-sent-icon"><?php echo sandys_icon( 'check' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
			<h3 class="sp-sent-title">Thanks, we’ve got it.</h3>
			<p class="sp-sent-text">Sandy or one of the crew will be in touch within the hour. If water is coming in, call <a href="<?php echo esc_attr( $tel ); ?>"><?php echo esc_html( $atts['phone'] ); ?></a>.</p>
			<button type="button" class="sp-again">Send another enquiry</button>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'sandys_enquiry_form', 'sandys_enquiry_form_shortcode' );

/**
 * Handle a submitted enquiry (normal post or background request from site.js).
 */
function sandys_handle_enquiry() {
	// phpcs:disable WordPress.Security.NonceVerification -- public form; protected by honeypot, timing and rate limit.
	$is_ajax = ! empty( $_POST['sp_ajax'] );
	$back    = isset( $_POST['sp_back'] ) ? esc_url_raw( wp_unslash( $_POST['sp_back'] ) ) : '';
	$back    = $back ? wp_validate_redirect( $back, home_url( '/' ) ) : ( wp_get_referer() ? wp_get_referer() : home_url( '/' ) );
	$back    = remove_query_arg( 'enquiry', strtok( $back, '#' ) );

	$respond = function ( $ok, $errors = array() ) use ( $is_ajax, $back ) {
		if ( $is_ajax ) {
			wp_send_json( array( 'ok' => $ok, 'errors' => $errors ), $ok ? 200 : 400 );
		}
		wp_safe_redirect( add_query_arg( 'enquiry', $ok ? 'sent' : 'error', $back ) . '#contact' );
		exit;
	};

	// Bots: honeypot filled or form sent faster than a person could.
	$started = isset( $_POST['sp_t'] ) ? (int) $_POST['sp_t'] : 0;
	if ( ! empty( $_POST['sp_company'] ) || ( $started && time() - $started < 3 ) ) {
		$respond( true );
	}

	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$key = 'sandys_rl_' . md5( $ip );
	$hit = (int) get_transient( $key );
	if ( $hit >= 6 ) {
		$respond( false, array( 'form' => 'Too many enquiries from this connection. Please call us instead.' ) );
	}
	set_transient( $key, $hit + 1, 10 * MINUTE_IN_SECONDS );

	$name    = sanitize_text_field( wp_unslash( $_POST['name'] ?? '' ) );
	$phone   = sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) );
	$email   = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
	$raw_em  = trim( (string) wp_unslash( $_POST['email'] ?? '' ) );
	$service = sanitize_text_field( wp_unslash( $_POST['service'] ?? '' ) );
	$message = sanitize_textarea_field( wp_unslash( $_POST['message'] ?? '' ) );
	// phpcs:enable

	$errors = array();
	if ( '' === $name ) {
		$errors['name'] = 'Please add your name';
	}
	if ( '' === $phone && '' === $raw_em ) {
		$errors['phone'] = 'Add a phone number or email';
	}
	if ( '' !== $raw_em && ! is_email( $raw_em ) ) {
		$errors['email'] = 'That email looks off';
	}
	if ( $errors ) {
		$respond( false, $errors );
	}

	$body = "Name: {$name}\nPhone: {$phone}\nEmail: {$email}\nNeeds: {$service}\n\n{$message}\n";

	$post_id = wp_insert_post(
		array(
			'post_type'    => 'sandys_enquiry',
			'post_status'  => 'private',
			'post_title'   => $name,
			'post_content' => $body,
		)
	);
	if ( $post_id && ! is_wp_error( $post_id ) ) {
		update_post_meta( $post_id, '_phone', $phone );
		update_post_meta( $post_id, '_email', $email );
		update_post_meta( $post_id, '_service', $service );
	}

	$to      = get_option( 'sandys_enquiry_email' );
	$to      = is_email( $to ) ? $to : get_option( 'admin_email' );
	$headers = $email ? array( 'Reply-To: ' . $name . ' <' . $email . '>' ) : array();
	$mailed  = wp_mail( $to, 'New website enquiry: ' . $name . ( $service ? ' (' . $service . ')' : '' ), $body . "\nSent from " . home_url( '/' ), $headers );
	if ( $post_id && ! is_wp_error( $post_id ) ) {
		update_post_meta( $post_id, '_mailed', $mailed ? 1 : 0 );
	}

	// Saved in the dashboard either way, so the customer sees success.
	$respond( (bool) $post_id );
}
add_action( 'admin_post_nopriv_sandys_enquiry', 'sandys_handle_enquiry' );
add_action( 'admin_post_sandys_enquiry', 'sandys_handle_enquiry' );
