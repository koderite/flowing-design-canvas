<?php
/**
 * Title: Header
 * Slug: sandys/header
 * Categories: sandys
 * Block Types: core/template-part/header
 * Inserter: false
 */
?>
<!-- wp:group {"className":"sp-header","layout":{"type":"default"}} -->
<div class="wp-block-group sp-header"><!-- wp:group {"className":"sp-container sp-header-inner","layout":{"type":"default"}} -->
<div class="wp-block-group sp-container sp-header-inner"><!-- wp:site-logo {"width":148,"shouldSyncIcon":false,"className":"sp-logo"} /-->
<!-- wp:navigation {"overlayMenu":"mobile","className":"sp-nav","layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:navigation-link {"label":"Services","url":"<?php echo sandys_anchor( 'services' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Why Sandy’s","url":"<?php echo sandys_anchor( 'about' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Areas","url":"<?php echo sandys_anchor( 'areas' ); ?>","kind":"custom"} /-->
<!-- wp:navigation-link {"label":"Contact","url":"<?php echo sandys_anchor( 'contact' ); ?>","kind":"custom"} /-->
<!-- /wp:navigation -->
<!-- wp:group {"className":"sp-header-actions","layout":{"type":"default"}} -->
<div class="wp-block-group sp-header-actions"><!-- wp:paragraph {"className":"sp-header-phone"} -->
<p class="sp-header-phone"><a href="tel:+447754179130">07754 179130</a></p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-sp-amber sp-btn-sm"} -->
<div class="wp-block-button is-style-sp-amber sp-btn-sm"><a class="wp-block-button__link wp-element-button" href="<?php echo sandys_anchor( 'contact' ); ?>">Get a quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->
<!-- wp:paragraph {"className":"sp-phone-circle"} -->
<p class="sp-phone-circle"><a href="tel:+447754179130">Call 07754 179130</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
