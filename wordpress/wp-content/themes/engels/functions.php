<?php

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
