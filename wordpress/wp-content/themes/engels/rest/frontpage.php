<?php

add_action( 'rest_api_init', function () {
	register_rest_route( 'engels/v1', '/frontpage/',
		[
			'methods'  => 'GET',
			'callback' => 'engels_rest_frontpage'
		]
	);
} );

function engels_rest_frontpage() {
	// Get the ID of the static frontpage. If not set it's 0
	$pid = (int) get_option( 'page_on_front' );

	// Get the corresponding post object (let's show our intention explicitly)
	$post = ( $pid > 0 ) ? get_post( $pid ) : null;

	// No static frontpage is set
	if ( ! is_a( $post, 'WP_Post' ) ) {
		return new WP_Error( 'wpse-error',
			esc_html__( 'No Static Frontpage', 'wpse' ), [ 'status' => 404 ] );
	}

	// Response setup
	$data = [
		'ID'      => $post->ID,
		'content' => [ 'raw' => $post->post_content ]
	];

	return new WP_REST_Response( $data, 200 );
}
