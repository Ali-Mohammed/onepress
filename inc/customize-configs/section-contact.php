<?php
/**
 * Section: Contact
 *
 * @package OnePress\Customizer
 * @since Unknown
 */

// Add settings panel.
$wp_customize->add_panel(
	'onepress_contact',
	array(
		'priority'        => 270,
		'title'           => esc_html__( 'Section: Contact', 'onepress' ),
		'description'     => '',
		'active_callback' => 'onepress_showon_frontpage',
	)
);

// Add Contact Settings section.
$wp_customize->add_section(
	'onepress_contact_settings',
	array(
		'priority'    => 3,
		'title'       => esc_html__( 'Section Settings', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);

// Contact Settings: Show Content setting.
$wp_customize->add_setting(
	'onepress_contact_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
	)
);

// Contact Settings: Show Content control.
$wp_customize->add_control(
	'onepress_contact_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide this section?', 'onepress' ),
		'section'     => 'onepress_contact_settings',
		'description' => esc_html__( 'Check this box to hide this section.', 'onepress' ),
	)
);

// Contact Settings: Section ID setting.
$wp_customize->add_setting(
	'onepress_contact_id',
	array(
		'sanitize_callback' => 'sanitize_key',
		'default'           => esc_html__( 'contact', 'onepress' ),
	)
);

// Contact Settings: Section ID control.
$wp_customize->add_control(
	'onepress_contact_id',
	array(
		'label'       => esc_html__( 'Section ID:', 'onepress' ),
		'section'     => 'onepress_contact_settings',
		'description' => esc_html__( 'The section id, we will use this for link anchor.', 'onepress' ),
	)
);

// Contact Settings: Title setting.
$wp_customize->add_setting(
	'onepress_contact_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Get in touch', 'onepress' ),
	)
);

// Contact Settings: Title control.
$wp_customize->add_control(
	'onepress_contact_title',
	array(
		'label'       => esc_html__( 'Section Title', 'onepress' ),
		'section'     => 'onepress_contact_settings',
		'description' => '',
	)
);

// Contact Settings: Sub Title setting.
$wp_customize->add_setting(
	'onepress_contact_subtitle',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => esc_html__( 'Section subtitle', 'onepress' ),
	)
);

// Contact Settings: Sub Title control.
$wp_customize->add_control(
	'onepress_contact_subtitle',
	array(
		'label'       => esc_html__( 'Section Subtitle', 'onepress' ),
		'section'     => 'onepress_contact_settings',
		'description' => '',
	)
);

// Contact Settings: Description setting.
$wp_customize->add_setting(
	'onepress_contact_desc',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Contact Settings: Description control.
$wp_customize->add_control(
	new OnePress_Editor_Custom_Control(
		$wp_customize,
		'onepress_contact_desc',
		array(
			'label'       => esc_html__( 'Section Description', 'onepress' ),
			'section'     => 'onepress_contact_settings',
			'description' => '',
		)
	)
);

// Add upsell setting & control.
onepress_add_upsell_for_section( $wp_customize, 'onepress_contact_settings' );

// Add Contact Content section.
$wp_customize->add_section(
	'onepress_contact_content',
	array(
		'priority'    => 6,
		'title'       => esc_html__( 'Section Content', 'onepress' ),
		'description' => '',
		'panel'       => 'onepress_contact',
	)
);

// Contact Content: Contact from shortcode setting.
$wp_customize->add_setting(
	'onepress_contact_cf7',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'validate_callback' => 'onepress_validate_shortcode',
		'default'           => '',
	)
);

// Contact Content: Contact from shortcode control.
$wp_customize->add_control(
	'onepress_contact_cf7',
	array(
		'label'       => esc_html__( 'Contact Form Shortcode.', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => wp_kses_post( 'Paste your form shortcode from contact form plugin here, e.g <code>[wpforms  id="123"]</code>', 'onepress' ),
	)
);

// Contact Content: Disable contact from setting.
$wp_customize->add_setting(
	'onepress_contact_cf7_disable',
	array(
		'sanitize_callback' => 'onepress_sanitize_checkbox',
		'default'           => 0,
	)
);

// Contact Content: Disable contact from control.
$wp_customize->add_control(
	'onepress_contact_cf7_disable',
	array(
		'type'        => 'checkbox',
		'label'       => esc_html__( 'Hide contact form completely.', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => esc_html__( 'Check this box to hide contact form.', 'onepress' ),
	)
);

// Contact Content: Text setting.
$wp_customize->add_setting(
	'onepress_contact_text',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Contact Content: Text control.
$wp_customize->add_control(
	new OnePress_Editor_Custom_Control(
		$wp_customize,
		'onepress_contact_text',
		array(
			'label'       => esc_html__( 'Contact Text', 'onepress' ),
			'section'     => 'onepress_contact_content',
			'description' => '',
		)
	)
);

// Add Horizontal line.
$wp_customize->add_setting( 'onepress_contact_text_hr', array( 'sanitize_callback' => 'onepress_sanitize_text' ) );
$wp_customize->add_control(
	new OnePress_Misc_Control(
		$wp_customize, 'onepress_contact_text_hr',
		array(
			'section' => 'onepress_contact_content',
			'type'    => 'hr',
		)
	)
);

// Contact Content: Contact box title setting.
$wp_customize->add_setting(
	'onepress_contact_address_title',
	array(
		'sanitize_callback' => 'sanitize_text_field',
		'default'           => '',
	)
);

// Contact Content: Contact box title control.
$wp_customize->add_control(
	'onepress_contact_address_title',
	array(
		'label'       => esc_html__( 'Contact Box Title', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Contact Content: Address setting.
$wp_customize->add_setting(
	'onepress_contact_address',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Contact Content: Address control.
$wp_customize->add_control(
	'onepress_contact_address',
	array(
		'label'       => esc_html__( 'Address', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Contact Content: Phone setting.
$wp_customize->add_setting(
	'onepress_contact_phone',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Contact Content: Phone control.
$wp_customize->add_control(
	'onepress_contact_phone',
	array(
		'label'       => esc_html__( 'Phone', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Contact Content: Email setting.
$wp_customize->add_setting(
	'onepress_contact_email',
	array(
		'sanitize_callback' => 'sanitize_email',
		'validate_callback' => 'onepress_validate_email',
		'default'           => '',
	)
);

// Contact Content: Email control.
$wp_customize->add_control(
	'onepress_contact_email',
	array(
		'label'       => esc_html__( 'Email', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);

// Contact Content: Fax setting.
$wp_customize->add_setting(
	'onepress_contact_fax',
	array(
		'sanitize_callback' => 'onepress_sanitize_text',
		'default'           => '',
	)
);

// Contact Content: Fax control.
$wp_customize->add_control(
	'onepress_contact_fax',
	array(
		'label'       => esc_html__( 'Fax', 'onepress' ),
		'section'     => 'onepress_contact_content',
		'description' => '',
	)
);
