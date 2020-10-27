<?php

/**
 * Require plugins
 */
require_once dirname( __FILE__ )
             . '/TGM-Plugin-Activation-2.6.1/class-tgm-plugin-activation.php';

add_action( 'tgmpa_register', 'engels_register_required_plugins' );

function engels_register_required_plugins() {
	$plugins = array(
		array(
			'name'      => 'Sentry',
			'slug'      => 'wp-sentry-integration',
			'required'  => false,
		),
	);

	$config = array(
		'id'           => 'engels',                // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => true,                    // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.
	);

	tgmpa( $plugins, $config );
}

/**
 * Register navigation
 */
function engels_navigation() {
	register_nav_menu( 'engels-navigation', __( 'Navigation' ) );
}

add_action( 'init', 'engels_navigation' );

/**
 * Register rest routes
 */
require_once dirname( __FILE__ ) . '/rest/register.php';

/**
 * Add CORS header
 */
function add_cors_http_header() {
	header( "Access-Control-Allow-Origin: *" );
}

add_action( 'init', 'add_cors_http_header' );
