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
