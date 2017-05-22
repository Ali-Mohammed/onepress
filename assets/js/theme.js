
function preload_images( images, complete_callback ) {
    var id = '_img_loading_'+( new Date().getTime() );
    jQuery( 'body').append( '<div id="'+id+'"></div>' );
    jQuery.each( images, function( index, src ){
        var img = jQuery( '<img>' );
        img.attr( 'alt', ''  );
        img.attr( 'class', 'image__preload'  );
        img.css( 'display', 'none' );
        img.attr( 'src', src );
        jQuery( '#'+id ).append( img );
    } );

    jQuery( '#'+id ).imagesLoaded( function() {
        if ( complete_callback ) {
            complete_callback();
        }
        setTimeout( function(){
            jQuery( '#'+id ).remove();
        }, 5000 );
    });

}

function _to_number( string ) {
    if ( typeof string === 'number' ) {
        return string;
    }
    var n  = string.match(/\d+$/);
    if ( n ) {
        return parseFloat( n[0] );
    } else {
        return 0;
    }
}

function _to_bool( v ) {
    if (  typeof v === 'boolean' ){
        return v;
    }

    if (  typeof v === 'number' ){
        return v === 0  ? false : true;
    }

    if ( typeof v === 'string' ) {
        if ( v === 'true' || v === '1' ) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/**
 * skip-link-focus-fix.js
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://github.com/Automattic/OnePress/pull/136
 */
( function() {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var id = location.hash.substring( 1 ),
                element;

            if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
                return;
            }

            element = document.getElementById( id );

            if ( element ) {
                if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }
})();


/**
 * Sticky header when scroll.
 */
jQuery( document ).ready( function( $ ) {

    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        var is_top_header = $( '#page > .site-header').length ?  true : false;
        $('.site-header').eq(0).wrap( '<div class="site-header-wrapper">' );
        var is_transparent = $( 'body').hasClass( 'header-transparent' );
        $wrap =  $( '.site-header-wrapper');
        $wrap.addClass( 'no-scroll' );

        if (! is_top_header ) {
            $( 'body').removeClass( 'header-transparent' );
        }
        var header_fixed = $('.site-header').eq(0);

        var header_h = header_fixed.height() || 0;

        var topbar = $( '#wpadminbar' ).height() || 0;
        if (  topbar > 0 ) {
            var  topbar_pos = $( '#wpadminbar').css( 'position' );
            if ( 'fixed' !== topbar_pos ) {
                topbar = 0;
            }
        }

        if ( ! is_transparent){
            $wrap.height( header_h );
        }

        function setUpHeaderHeight(){
            topbar = $( '#wpadminbar' ).height() || 0;
            if (  topbar > 0 ) {
                var  topbar_pos = $( '#wpadminbar').css( 'position' );
                if ( 'fixed' !== topbar_pos ) {
                    topbar = 0;
                }
            }
            header_fixed.height( 'auto' );
            $wrap.height( 'auto' );

            jQuery('.site-header .onepress-menu').css( 'line-height', 'auto' );

            header_h = header_fixed.height() || 0;
            if ( ! is_transparent){
                $wrap.height( header_h );
            }
            var header_height = jQuery('.site-header').height();
            jQuery('.site-header .onepress-menu').css( 'line-height', header_height + "px" );

            $( window ).trigger('site_header_height_changed');
        }

        $( window).resize( function(){
            setUpHeaderHeight();
        } );

        // Need to improve
        // TODO: Fix safari menu issue
        for ( var i = i; i <= 10; i++ ) {
            setTimeout( function(){
                setUpHeaderHeight();
            } , i*1000 );
        }


        $( document ).scroll( function(){
            var header_parent = header_fixed.parent();
            var p_to_top = header_parent.offset().top;
            var st = $( document ).scrollTop();
            if( st > p_to_top && st > 0 ) {
                $wrap.addClass( 'is-fixed').removeClass( 'no-scroll' );
                header_fixed.addClass('header-fixed');
                header_fixed.css( 'top', topbar+'px' );
            } else {
                header_fixed.removeClass('header-fixed');
                header_fixed.css( 'top', 'auto' );
                $wrap.removeClass( 'is-fixed' ).addClass( 'no-scroll' );
            }
        });

    }

});


/*
* Nav Menu & element actions
*
* Smooth scroll for navigation and other elements
*/
( function( $ ) {
    var mobile_max_width =  1140; // Media max width for mobile
    var main_navigation = jQuery('.main-navigation .onepress-menu');
    var stite_header =  $( '.site-header' );

    // Initialise Menu Toggle
    jQuery('#nav-toggle').on('click', function(event){
        event.preventDefault();
        jQuery('#nav-toggle').toggleClass('nav-is-visible');
        main_navigation.toggleClass("onepress-menu-mobile");
        jQuery('.header-widget').toggleClass("header-widget-mobile");
        if ( main_navigation.hasClass( 'onepress-menu-mobile' ) && $( window).width() <= mobile_max_width ) {
            var h = $( window).height( ) - stite_header.height();
            main_navigation.css( {
                height: h,
                overflow: 'auto',
            });
        } else {
            main_navigation.removeAttr( 'style' );
        }
    });

    $( window).resize( function(){
        if ( main_navigation.hasClass( 'onepress-menu-mobile' ) && $( window).width() <= mobile_max_width ) {
            var h = $( window).height( ) - stite_header.height();
            main_navigation.css( {
                height: h,
                overflow: 'auto',
            });
        } else {
            main_navigation.removeAttr( 'style' );
        }
    } );

    jQuery('.onepress-menu li.menu-item-has-children, .onepress-menu li.page_item_has_children').each( function() {
        jQuery(this).prepend('<div class="nav-toggle-subarrow"><i class="fa fa-angle-down"></i></div>');
    });

    jQuery('.nav-toggle-subarrow, .nav-toggle-subarrow .nav-toggle-subarrow').click(
        function () {
            jQuery(this).parent().toggleClass("nav-toggle-dropdown");
        }
    );

    // Get the header height and wpadminbar height if enable.
    var h;
    window.current_nav_item = false;
    if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
        h = jQuery('#wpadminbar').height() + jQuery('.site-header').height();
    } else {
        h = jQuery('#wpadminbar').height();
    }

    // Navigation click to section.
    jQuery('.home #site-navigation li a[href*="#"]').on('click', function(event){
        event.preventDefault();
        // if in mobile mod
        if (  jQuery( '.onepress-menu' ).hasClass( 'onepress-menu-mobile' ) ) {
            jQuery( '#nav-toggle' ).trigger( 'click' );
        }
        smoothScroll( jQuery( this.hash ) );
    });

    function setNavActive( currentNode ){
        if ( currentNode ) {
            currentNode = currentNode.replace('#', '');
            if (currentNode)
                jQuery('#site-navigation li').removeClass('onepress-current-item');
            if (currentNode) {
                jQuery('#site-navigation li').find('a[href$="#' + currentNode + '"]').parent().addClass('onepress-current-item');
            }
        }
    }

    function inViewPort( $element, offset_top ){
        if ( ! offset_top ) {
            offset_top = 0
        }
        var view_port_top = jQuery( window ).scrollTop();
        if ( $('#wpadminbar' ).length > 0 ) {
            view_port_top -= $('#wpadminbar' ).outerHeight() - 1;
            offset_top += $('#wpadminbar' ).outerHeight() - 1;
        }
        var view_port_h = $( 'body' ).outerHeight();

        var el_top = $element.offset().top;
        var eh_h = $element.height();
        var el_bot = el_top + eh_h;
        var view_port_bot = view_port_top + view_port_h;

        var all_height = $( 'body' )[0].scrollHeight;
        var max_top = all_height - view_port_h;


        var in_view_port = false;
        // If scroll maximum
        if ( view_port_top >= max_top ) {

            if ( ( el_top < view_port_top &&  el_top > view_port_bot ) || ( el_top > view_port_top && el_bot < view_port_top  ) ) {
                in_view_port = true;
            }

        } else {
            if ( el_top <= view_port_top + offset_top ) {
                //if ( eh_bot > view_port_top &&  eh_bot < view_port_bot ) {
                if ( el_bot > view_port_top  ) {
                    in_view_port = true;
                }
            }
        }
        return in_view_port;
    }

    // Add active class to menu when scroll to active section.
    var _scroll_top = jQuery(window).scrollTop();
    jQuery( window ).scroll(function() {
        var currentNode = null;

        if ( ! window.current_nav_item ) {
            var current_top = jQuery( window ).scrollTop();

            if ( onepress_js_settings.onepress_disable_sticky_header != '1' ) {
                h = jQuery('#wpadminbar').height() + jQuery('.site-header').height();
            } else {
                h = jQuery('#wpadminbar').height();
            }

            if( _scroll_top < current_top )
            {
                jQuery('section').each( function ( index ) {
                    var section = jQuery( this );
                    var currentId = section.attr('id') || '';

                    var in_vp = inViewPort( section , h + 10) ;
                    if ( in_vp ) {
                        currentNode = currentId;
                    }
                });

            } else {
                var ns = jQuery('section').length;
                for ( var i = ns - 1; i >= 0; i-- ) {
                    var section = jQuery('section').eq( i );
                    var currentId = section.attr('id') || '';
                    var in_vp = inViewPort( section , h + 10) ;
                    if ( in_vp ) {
                        currentNode = currentId;
                    }

                }
            }
            _scroll_top = current_top;

        } else {
            currentNode = window.current_nav_item.replace('#', '');
        }

        setNavActive( currentNode );
    });

    // Move to the right section on page load.
    jQuery(window).load(function(){
        var urlCurrent = location.hash;
        if ( jQuery( urlCurrent ).length > 0 ) {
            smoothScroll( urlCurrent );
        }
    });

    // Other scroll to elements
    jQuery('.hero-slideshow-wrapper a[href*="#"]:not([href="#"]), .parallax-content a[href*="#"]:not([href="#"]), .back-top-top').on('click', function(event){
        event.preventDefault();
        smoothScroll( jQuery( this.hash ) );
    });

    // Smooth scroll animation
    function smoothScroll( element ) {
        if ( element.length <= 0 ) {
            return false;
        }
        jQuery("html, body").animate({
            scrollTop: ( jQuery( element ).offset().top - h) + "px"
        }, {
            duration: 800,
            easing: "swing",
            complete: function(){
                window.current_nav_item = false;
            }
        });
    }

    if ( onepress_js_settings.is_home ) {
        // custom-logo-link
        jQuery( '.site-branding .site-brand-inner').on( 'click', function( e ){
            e.preventDefault();
            jQuery("html, body").animate({
                scrollTop: "0px"
            }, {
                duration: 300,
                easing: "swing"
            });
        } );
    }

})( jQuery );



jQuery(document).ready(function ( $ ) {

    if ( isMobile.any() ) {
        jQuery( 'body' ).addClass( 'body-mobile' ).removeClass( 'body-desktop' );
    } else {
        jQuery( 'body' ).addClass( 'body-desktop') .removeClass( 'body-mobile' );
    }

    /**
     * Reveal Animations When Scrolling
     */
    if ( onepress_js_settings.onepress_disable_animation != '1' ) {
        var wow = new WOW(
            {
                offset:       50,
                mobile:       false,
                live:         false
            }
        );
        wow.init();
    }

    /**
     * Text rotator
     */
    jQuery(".js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: onepress_js_settings.hero_animation,
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: "|",
        // The delay between the changing of each phrase in milliseconds.
        speed: parseInt( onepress_js_settings.hero_speed ),
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

    /**
     * Responsive Videos
     */
    jQuery('.site-content').fitVids();


    /**
     * Video lightbox
     */

    if ($.fn.lightGallery ) {

        $(".videolightbox-popup").lightGallery({});
    }

    // Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /**
     * Center vertical align for navigation.
     */
    if ( onepress_js_settings.onepress_vertical_align_menu == '1' ) {
        var header_height = jQuery('.site-header').height();
        jQuery('.site-header .onepress-menu').css( 'line-height', header_height + "px" );
    }



    /**
     * Section: Hero Full Screen Slideshow
     */
    function hero_full_screen(){
        if ( $( '.hero-slideshow-fullscreen').length > 0 ) {
            var is_transparent = jQuery('body').hasClass('header-transparent');
            var headerH;
            var is_top_header = jQuery('#page > .site-header').length ? true : false;
            if (is_top_header && !is_transparent) {
                headerH = jQuery('.site-header').height();
            } else {
                headerH = 0;
            }
            jQuery('.hero-slideshow-fullscreen').css('height', (jQuery(window).height() - headerH + 1) + 'px');
        }
    }
    jQuery(window).on('resize', function (){
        hero_full_screen();
    });
    hero_full_screen();

    /**
     * Hero sliders
     */
    if( $( '#parallax-hero').length <= 0 ) {
        jQuery('.hero-slideshow-wrapper').each(function () {
            var hero = $(this);
            if (hero.hasClass('video-hero')) {
                return;
            }
            var images = hero.data('images') || false;
            if (typeof images == 'string') {
                images = jQuery.parseJSON(images);
            }

            if (images) {
                preload_images(images, function () {
                    hero.backstretch(images, {
                        fade: _to_number(onepress_js_settings.hero_fade),
                        duration: _to_number(onepress_js_settings.hero_duration)
                    });
                    hero.addClass('loaded');
                    hero.removeClass('loading');
                    setTimeout(function () {
                        hero.find('.slider-spinner').remove();
                    }, 600);
                });
            } else {
                hero.addClass('loaded');
                hero.removeClass('loading');
                hero.find('.slider-spinner').remove();
            }

        });
    }

    $('.section-parallax, .parallax-hero').bind('inview', function ( event, visible ) {
        if ( visible == true ) {
        } else {
        }
    });

    var lastScrollTop = 0;
    // Paralax effect
    function parallaxPosition( direction ){
        var top = $( window ).scrollTop();
        var wh = $( window).height();
        $('.section-parallax, .parallax-hero').each( function(  ){
            var $el = $( this );
            var h = $el.width();
            var r = .3;
            if ( wh > h ) {
                r = .3;
            } else {
                r = .6;
            }

            var is_inview = $el.data( 'inview' );
            if ( is_inview ) {
                var offsetTop = $el.offset().top;
                var diff, bgTop;
                diff = top - offsetTop;
                bgTop = diff * r;
                $( '.parallax-bg', $el ) .css( 'background-position', '50% '+( bgTop )+'px' );
            }

        } );
    }
    $(window).scroll(function(e){
        var top = $( window ).scrollTop();
        var direction = '';
        if ( top > lastScrollTop ){
            direction = 'down';
        } else {
            direction = 'up';
        }
        lastScrollTop = top ;
        parallaxPosition( );
    });
    $(window).resize( function(){
        parallaxPosition( );
    } );

    $(window).trigger('scroll');




    // Parallax hero
    $('.parallax-hero').each(function () {
        var hero = $(this);
        hero.addClass('loading');
        $('.parallax-bg', hero).imagesLoaded({background: true}, function () {
            hero.find('.hero-slideshow-wrapper').addClass('loaded');
            hero.removeClass('loading');

            setTimeout(function () {
                hero.find('.hero-slideshow-wrapper').find('.slider-spinner').remove();
            }, 600);
        }).fail(function (instance) {
            hero.removeClass('loading');
            hero.find('.hero-slideshow-wrapper').addClass('loaded');
            hero.find('.hero-slideshow-wrapper').find('.slider-spinner').remove();
        });
    });

    $('.section-parallax').each(function () {
        var s = $(this);
        $('.parallax-bg', s).imagesLoaded({background: true}, function () {


        }).fail(function (instance) {

        });
    });


    /**
     * Gallery
     */
    function onepress_gallery_init( $context ){
        // justified
        if ( $.fn.justifiedGallery ) {
            $( '.gallery-justified', $context).imagesLoaded( function(){
                $( '.gallery-justified', $context).each( function(){
                    var margin = $( this).attr( 'data-spacing' ) || 20;
                    var row_height = $( this).attr( 'data-row-height' ) || 120;
                    margin = _to_number( margin );
                    row_height = _to_number( row_height );
                    $( this ).justifiedGallery({
                        rowHeight: row_height,
                        margins: margin,
                        selector: 'a, div:not(.spinner), .inner'
                    });
                } );
            } );
        }

        // Slider
        if ( $.fn.owlCarousel ) {
            // Slider
            $( '.gallery-slider', $context ).owlCarousel({
                items: 1,
                itemsCustom: false,
                itemsDesktop: 1,
                itemsDesktopSmall: 1,
                itemsTablet: 1,
                itemsTabletSmall: false,
                itemsMobile: 1,
                singleItem: true,
                itemsScaleUp: false,

                slideSpeed : 200,
                paginationSpeed : 800,
                rewindSpeed : 1000,
                autoPlay : 4000,
                stopOnHover : true,

                navigation : true,
                navigationText : ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],

                pagination : false,
                paginationNumbers : false,
                autoHeight : true,
            });

            $('.gallery-carousel', $context).each( function(){
                var n = $( this ).attr( 'data-col' ) || 5;
                n = _to_number( n );
                if( n <= 0 ) {
                    n = 5;
                }

                $( this ).owlCarousel({
                    items: n,
                    itemsCustom : false,
                    itemsDesktop : [1199, ( n > 4) ? 4 : n ],
                    itemsDesktopSmall : [979, ( n > 3) ? 3 : n ],
                    itemsTablet : [768, ( n > 2) ? 2 : n ],
                    itemsTabletSmall : false,
                    itemsMobile : [479, ( n > 2) ? 2 : n ],
                    singleItem : false,
                    itemsScaleUp : false,

                    slideSpeed : 200,
                    paginationSpeed : 800,
                    rewindSpeed : 1000,
                    autoPlay : 4000,
                    stopOnHover : true,

                    navigation : true,
                    navigationText : ["<i class='lg-icon'></i>", "<i class='lg-icon'></i>"],

                    pagination : false,
                    paginationNumbers : false,
                });

            } );

        }


        function isotope_init (){
            if ( $.fn.isotope ) {
                $(".gallery-masonry", $context ).each(function () {
                    var m = $(this);
                    var gutter = m.attr('data-gutter') || 10;
                    var columns = m.attr('data-col') || 5;

                    gutter = _to_number(gutter);
                    columns = _to_number(columns);

                    var w = $(window).width();
                    if ( w <= 940 ) {
                        columns = columns > 2 ? columns - 1 : columns;
                    }

                    if ( w <= 720 ) {
                        columns = columns > 3 ? 3 : columns;
                    }

                    if ( w <= 576 ) {
                        columns = columns > 2 ? 2 : columns;
                    }

                    //gutter = gutter / 2;
                   // m.parent().css({'margin-left': -gutter, 'margin-right': -gutter});
                    m.find('.g-item').css({'width': ( 100 / columns  ) + '%', 'float': 'left', 'padding': 0});
                   // m.find('.g-item .inner').css({'padding': gutter / 2});
                    m.isotope({
                        // options
                        itemSelector: '.g-item',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.inner'
                        }
                    });

                });
            }
        }
        $( ".gallery-masonry", $context ).imagesLoaded( function() {
            isotope_init();
        });


        $( window ).resize( function(){
            isotope_init();
        } );

        if ( $.fn.lightGallery ) {

            $('.enable-lightbox', $context).lightGallery({
                mode: 'lg-fade',
                selector: 'a',
                //cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)'
            });

        }
    }

    onepress_gallery_init( $( '.gallery-content' ) );

    if ( 'undefined' !== typeof wp && wp.customize && wp.customize.selectiveRefresh ) {
        wp.customize.selectiveRefresh.bind( 'partial-content-rendered', function( placement ) {
            if ( placement.partial.id == 'section-gallery' ) {
                onepress_gallery_init( placement.container.find( '.gallery-content' ) );

                // Trigger resize to make other sections work.
                $( window ).resize();
            }
        } );
    }

});
