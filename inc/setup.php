<?php
/**
* This file is used to do some basic setup, such as register theme support for post_thumbnails,
* and get the Create React App assets enqueued properly
*/
/**
* Add thumbnail support to the site
*/
add_theme_support( 'post-thumbnails' );
/**
* Add a thumbnail column to the posts screen
*
* @return array
*/
add_filter( 'manage_posts_columns', function( $columns ) {
  $columns['featured_image'] = __( 'Thumbs', 'graphql-workshop' );
  return $columns;
}, 5 );
/**
* Output the thumbnail in the thumbnail column
*/
add_action( 'manage_posts_custom_column', function( $column_name, $id ) {
  if ( $column_name === 'featured_image' ) {
    echo the_post_thumbnail( 'thumbnail' );
  }
}, 5, 2 );
/**
* Gets the contents of the Create React App manifest file
*
* @return array|bool|string
*/
function get_app_manifest() {
  $manifest = file_get_contents( get_template_directory_uri() . '/react/build/asset-manifest.json' );
  $manifest = (array) json_decode( $manifest );
  return $manifest;
}
/**
* Gets the path to the stylesheet compiled by Create React App
*
* @return string
*/
function get_app_stylesheet() {
  $manifest = get_app_manifest();
  return get_template_directory_uri() . '/assets/app/build' . $manifest['main.css'];
  //return get_template_directory_uri() . '/assets/main.css';
}
/**
* Gets the path to the built javascript file compiled by Create React App
*
* @return string
*/
function get_app_script() {
  $manifest = get_app_manifest();
  return get_template_directory_uri() . '/assets/app/build' . $manifest['main.js'];
  //return get_template_directory_uri() . '/assets/main.js';
}
/**
* Enqueues the scripts
*/
add_action( 'wp_enqueue_scripts', function() {
  enqueue_react_app();
} );
/**
* Enqueues the stylesheet and js
*/
function enqueue_react_app() {
  $manifest = get_app_manifest();

  foreach ($manifest as $key => $value) {
    if (!strstr($key, 'map') && !strstr($key, 'html') && !strstr($key, 'service-worker') && !strstr($key, 'html')) {
      if (strstr($key, 'css')) {
        wp_enqueue_style( 'exp-'.$key, get_template_directory_uri() . '/react/build' . $manifest[$key], array(), false, false );
      }else{
        wp_enqueue_script( 'exp-'.$key, get_template_directory_uri() . '/react/build' . $manifest[$key], array(), false, true );
      }
    }
  }
  //wp_enqueue_script( 'exp-main', get_app_script(), array(), false, true );
  //wp_enqueue_script( 'exp-one', get_template_directory_uri() . '/assets/app/build' . $manifest['static/js/1.55800254.chunk.js'], array(), false, true );
  //wp_enqueue_script( 'exp-runtime', get_template_directory_uri() . '/assets/app/build' . $manifest['runtime~main.js'], array(), false, true );
  //wp_enqueue_style( 'graphql-workshop', get_app_stylesheet(), array(), false, false );
}
