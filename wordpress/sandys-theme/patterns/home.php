<?php
/**
 * Title: Full homepage
 * Slug: sandys/home
 * Categories: sandys
 * Description: Every homepage section in order. Insert into an empty page.
 */

foreach ( array( 'hero', 'intro', 'services', 'mains', 'emergency', 'process', 'reviews', 'contact' ) as $sandys_section ) {
	include __DIR__ . '/' . $sandys_section . '.php';
	echo "\n";
}
