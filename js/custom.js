/* JS Document */

jQuery(document).ready(function($)
{
	"use strict";

	var ctrl = new ScrollMagic.Controller();
	var map;
	var header = $('.header');
	var hamb = $('.hamburger_container_outer');
	var hambActive = false;

	setHeader();

	$(window).resize(function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initSlider();
	initParallax();
	initHero();
	initHamburger();
	initProjects();
	initLettering();
	initVideo();
	initGallery();
	initGoogleMap();
	initContact();
	initScrolling();

	function setHeader()
	{
		if(window.innerWidth < 768)
		{
			if($(window).scrollTop() > 100)
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"rgba(255, 255, 255, 0.9)"});
				hamb.css({'height':"60px", "marginTop":"0px"});
			}
			else
			{
				header.css({'height':"60px", "marginTop":"0px", "background":"transparent"});
				hamb.css({'height':"60px", "marginTop":"0px"});
			}
		}
		else
		{
			if($(window).scrollTop() > 100)
			{
				header.css({'height':"80px", "marginTop":"0px", "background":"rgba(255, 255, 255, 0.9)"});
				hamb.css({'height':"80px", "marginTop":"0px"});
			}
			else
			{
				header.css({'height':"100px", "background":"transparent"});
				hamb.css("height", "100px");
			}
		}

		if(window.innerWidth > 991 && hambActive)
		{
			fsMenuClose();
		}
	}

	/* Slider */

	function initSlider()
	{
		var firstparallaxslider = new parallaxSlider(
		{
			wrapperid: 'myparallaxslider', //ID of DIV on page to house slider
			displaymode: {type:'auto', pause:3000, cycles:2, stoponclick:false, pauseonmouseover:false},
			delaybtwdesc:  500, // delay in milliseconds between the revealing of each description layer inside a slide
			navbuttons: ['images/left.png', 'images/right.png', 'up.png', 'down.png'], // path to nav images
			activeslideclass: 'selectedslide', // CSS class that gets added to currently shown DIV slide
			orientation: 'h', //Valid values: "h" or "v"
			persist: false, //remember last viewed slide and recall within same session?
			slideduration: 1500 //transition duration (milliseconds)
		});

		var left = $('.main_nav_left');
		var right = $('.main_nav_right');

		left.on('click', function()
		{
			firstparallaxslider.navigate('back');
		});

		right.on('click', function()
		{
			firstparallaxslider.navigate('forth');
		});

		var hvr = $('.main_slider_nav');
		var pos = $('.main_nav_position');
		var arrows = $('.main_nav_arrows_inner');

		hvr.on('mouseenter', function()
		{
			pos.css({'transition-delay':'0ms', 'visibility':"hidden", 'opacity':"0"});
			arrows.css({'transition-delay':'200ms', 'visibility':'visible', 'opacity':'1'});
		});

		hvr.on('mouseleave', function()
		{
			arrows.css({'transition-delay':'0ms', 'visibility':'hidden', 'opacity':'0'});
			pos.css({'transition-delay':'200ms', 'opacity':"1", 'visibility':"visible"});
		});
	}

	function initParallax()
	{
		/* Adding parallax effect to the slider container */
		var homeBcg = $('.slider_container');

		var homeBcgScene = new ScrollMagic.Scene({
	        triggerElement: homeBcg,
	        triggerHook: 1,
	        duration: "100%"
	    })
	    .setTween(TweenMax.to(homeBcg, 1, {y: '40%', ease:Power0.easeNone}))
	    .addTo(ctrl);

	    var scene = document.getElementById('scene');
		var parallax = new Parallax(scene, {
		  relativeInput: true,
		  clipRelativeInput: false,
		  hoverOnly: true,
		  calibrateX: false,
		  calibrateY: true,
		  invertX: false,
		  invertY: true,
		  limitX: false,
		  limitY: false,
		  scalarX: 5,
		  scalarY: 8,
		  frictionX: 0.2,
		  frictionY: 0.8,
		  originX: 0.0,
		  originY: 0.0,
		  precision: 1,
		  pointerEvents: false,
		  onReady: function() { alert('ready!'); }
		});

		$('.contact_background').parallax({imageSrc: 'images/swift_background_2.jpg'});
	}

	function initHero()
	{
		var heroOverlay = $('.slider_overlay');
		var heroContent = $('.home_content');
		var sliderNav = $('.main_slider_nav');
		var heroSocialContainer = $('.home_social');
		var heroSocial = $('.home_share ul li');

		/* move hero overlay on scroll */
		var heroOverlayScene = new ScrollMagic.Scene({
			triggerElement: heroOverlay,
			triggerHook: 1,
			duration: "100%"
		})
		.setTween(TweenMax.to(heroOverlay, 1, {x: '-7.5%', ease:Power0.easeNone}))
		.addTo(ctrl);

		/* move hero content on scroll */
		var heroContentScene = new ScrollMagic.Scene({
			triggerElement: heroContent,
			triggerHook: 1,
			duration: "100%"
		})
		.setTween(TweenMax.to(heroContent, 1, {x: '-50%', y: '-100%', opacity:'0', ease:Power0.easeNone}))
		.addTo(ctrl);

		/* move slider nav on scroll */
		var sliderNavScene = new ScrollMagic.Scene({
			triggerElement: heroContent,
			triggerHook: 1,
			duration: "100%"
		})
		.setTween(TweenMax.to(sliderNav, 1, {x: '-400%', opacity:'0', ease:Power0.easeNone}))
		.addTo(ctrl);

		/* move social on scroll */
		var heroSocialScene = new ScrollMagic.Scene({
			triggerElement: heroContent,
			triggerHook: 1,
			duration: "100%"
		})
		.setTween(TweenMax.to(heroSocialContainer, 1, {x: '-50%', opacity:'0', ease:Power0.easeNone}))
		.addTo(ctrl);
	}

	function initHamburger()
	{
		var hamburger = $('.hamburger');

		hamburger.on('click', function()
		{
	  		if(hamburger.hasClass('active'))
	  		{
	  			/* animate menu out of view */
	  			fsMenuClose();
	  		}
	  		else
	  		{
	  			/* animate menu into view */
	  			fsMenuOpen();
	  		}
		});	
	}

	function fsMenuOpen()
	{
		var hamburger = $('.hamburger');
		var fsMenu = $('.fs_menu_overlay');
		var fsMenuLeft = $('.fs_menu_left');
		var fsMenuItems = $('.fs_nav ul li');
		var fsSocial = $('.fs_menu_social');
		var div1 = $('.hamburger div:first-child');
		var div2 = $('.hamburger div:last-child');

		hamburger.addClass('active');
		fsMenu.addClass('active');
		var hamburgerRotateIn = TweenMax.to($('.hamburger_container'), 1, {rotation:360, x:-22, ease:Power2.easeOut});

		if(window.innerWidth < 480)
		{
			var fsMenuTween1 = TweenMax.staggerTo(fsMenuItems, 0.5, {x:-125, autoAlpha:1, ease:Power2.easeOut, delay:0.5}, 0.05);
		}	
		else if(window.innerWidth < 768)
		{
			var fsMenuTween2 = TweenMax.staggerTo(fsMenuItems, 0.5, {x:-150, autoAlpha:1, ease:Power2.easeOut, delay:0.5}, 0.05);
		}
		else
		{
			var fsMenuTween3 = TweenMax.staggerTo(fsMenuItems, 0.5, {x:-150, autoAlpha:1, ease:Power2.easeOut, delay:0.5}, 0.05);
		}
		
		fsMenuLeft.addClass('active');
		fsMenu.addClass('active');
		var fsSocIn = TweenMax.to(fsSocial, 0.5, {autoAlpha:1, ease:Power2.easeOut, delay:0.7});
		hambActive = true;
	}

	function fsMenuClose()
	{
		var hamburger = $('.hamburger');
		var fsMenu = $('.fs_menu_overlay');
		var fsMenuLeft = $('.fs_menu_left');
		var fsMenuItems = $('.fs_nav ul li');
		var fsSocial = $('.fs_menu_social');
		var div1 = $('.hamburger div:first-child');
		var div2 = $('.hamburger div:last-child');

		hamburger.removeClass('active');
		var hamburgerRotateOut = TweenMax.to($('.hamburger_container'), 1, {rotation:0, x:0, ease:Power2.easeOut});

		setTimeout(function()
		{
			fsMenuLeft.removeClass('active');
		}, 200);

		setTimeout(function()
		{
			fsMenu.removeClass('active');
		}, 300);
		
		var fsMenuTween4 = TweenMax.staggerTo(fsMenuItems, 0.8, {x:150, autoAlpha:0, ease:Power4.easeOut}, 0.06);
		var fsSocOut = TweenMax.to(fsSocial, 0.5, {autoAlpha:0, ease:Power2.easeOut, delay:0.2});
		hambActive = false;
	}

	function initProjects()
	{
		var owl_1 = $('.projects_slider');

		owl_1.owlCarousel(
		{
			items: 3,
			loop:true,
			mouseDrag:false,
			center: true,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			navSpeed: 500,
			smartSpeed: 500,
			autoplaySpeed: 500,
			dots:false,
			responsive:
			{
				0:{items:1},
				480:{items:1},
				991:{items:3}
			}
		});

		var left = $('.projects_slider_nav_left');
		var right = $('.projects_slider_nav_right');
		
		left.on('click', function()
		{
			owl_1.trigger('prev.owl.carousel');
		});
		
		right.on('click', function()
		{
			owl_1.trigger('next.owl.carousel');
		});
	}

	function initLettering()
	{
		var links = $('.hvr');

		links.each(function()
		{
			var ele = $(this);
			charming(this);
			var letters = Array.from(this.querySelectorAll('span'));
			var isActive;
		    var eleTimeout;
		    var hoverColor = ele.data('color-enter');
		    var defaultColor = ele.data('color-leave');

			ele.on('mouseenter', function()
			{
				eleTimeout = setTimeout(function()
				{
					isActive = true;
					anime.remove(letters);
					anime({
						targets: letters,
						delay: (t,i) => i*5,
						translateY: [
							{value: 5, duration: 150, easing: 'easeInQuad'},
							{value: [-5,0], duration: 150, easing: 'easeOutQuad'}
						],
						opacity: [
							{value: 0, duration: 150, easing: 'linear'},
							{value: 1, duration: 150, easing: 'linear'}
						],
						color: {
							value: hoverColor,
							duration: 1,
							delay: (t,i,l) => i*15+150
						}
					});
				}, 50);	
			});

			ele.on('mouseleave', function()
			{
				clearTimeout(eleTimeout);
				if( !isActive ) return;
				isActive = false;

				anime.remove(letters);
				anime({
					targets: letters,
					delay: (t,i,l) => (l-i-1)*5,
					translateY: [
						{value: 5, duration: 150, easing: 'easeInQuad'},
						{value: [-5,0], duration: 150, easing: 'easeOutQuad'}
					],
					opacity: [
						{value: 0, duration: 150, easing: 'linear'},
						{value: 1, duration: 150, easing: 'linear'}
					],
					color: {
						value: defaultColor,
						duration: 1,
						delay: (t,i,l) => (l-i-1)*15+150
					}
				});
			});
		});
	}

	function initVideo()
	{
		$('.video').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });
	}

	function initGallery()
	{
		$('#gallery_slider').nivoSlider(
		{ 
			effect: 'random',                 // Specify sets like: 'fold,fade,sliceDown' 
		    slices: 15,                       // For slice animations 
		    boxCols: 8,                       // For box animations 
		    boxRows: 4,                       // For box animations 
		    animSpeed: 500,                   // Slide transition speed 
		    pauseTime: 5000,                  // How long each slide will show 
		    startSlide: 0,                    // Set starting Slide (0 index) 
		    directionNav: true,               // Next & Prev navigation 
		    controlNav: true,                 // 1,2,3... navigation 
		    controlNavThumbs: false,          // Use thumbnails for Control Nav 
		    pauseOnHover: false,               // Stop animation while hovering 
		    manualAdvance: true,             // Force manual transitions 
		    prevText: 'Prev',                 // Prev directionNav text 
		    nextText: 'Next',                 // Next directionNav text 
		    randomStart: false,               // Start on a random slide 
		    beforeChange: function(){$('#gallery_slider .nivo-caption').css("opacity", "0")},       // Triggers before a slide transition 
		    afterChange: function(){$('#gallery_slider .nivo-caption').css("opacity", "1")},        // Triggers after a slide transition 
		    slideshowEnd: function(){},       // Triggers after all slides have been shown 
		    lastSlide: function(){},          // Triggers when last slide is shown 
		    afterLoad: function(){$('#gallery_slider .nivo-caption').css("opacity", "1")}           // Triggers when slider has loaded

		});

		/* change slide with nav buttons */

		var galleryLeft = $('.gallery_slider_nav_left');
		var galleryRight = $('.gallery_slider_nav_right');

		galleryLeft.on('click', function()
		{
			$(".nivo-directionNav .nivo-prevNav").click();
		});

		galleryRight.on('click', function()
		{
			$(".nivo-directionNav .nivo-nextNav").click();
		});

		/* change slide with thumbnails */

		var thumbs = $('.gallery_thumbnail');
		var container = $('.gallery_thumbnails_container');
		var thumbNum = thumbs.length;

		if(thumbNum > 5)
		{
			container.css("width", "100vw");
			thumbs.css("width", "calc(100vw / " + thumbNum + " - 4px)");
		}

		thumbs.on('click', function()
		{
			var imgNum = $(this).data('order') - 1;
			var slideNum = $('.nivoSlider').data('nivo:vars').currentSlide;
			if(imgNum != slideNum)
			{
				$('.nivo-control').eq(imgNum).trigger('click');
			}
		});
	}

    function initGoogleMap()
    {
    	var myLatlng = new google.maps.LatLng(-33.866923, 151.24951);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
			[
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.icon",
			    "stylers": [
			      {
			        "visibility": "off"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#f5f5f5"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#bdbdbd"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e2e2e2"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#dadada"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.line",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e5e5e5"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.station",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#c9c9c9"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#00bbd5"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  }
			]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);
    	var q;

		var marker = new google.maps.Marker({
			position: myLatlng,
			map:map,
			title:'SWIFT'
		});

		setMap();
			
		google.maps.event.addListener(map, 'zoom_changed', function()
		{
			setMap();
		});

    	google.maps.event.addDomListener(window, 'resize', function()
    	{
    		setTimeout(function()
			{
				if(window.innerWidth > 991)
				{
					q = window.innerWidth / 4 * -1;
					google.maps.event.trigger(map, "resize");
					map.setCenter(myLatlng);
			    	map.panBy(q, 0);
				}
				else
				{
					google.maps.event.trigger(map, "resize");
					map.setCenter(myLatlng);
				}
			}, 1000);
    	});

    	function setMap()
    	{
    		if(window.innerWidth > 991)
			{
				q = window.innerWidth / 4 * -1;
				map.setCenter(myLatlng);
		    	map.panBy(q, 0);
			}
			else
			{
				map.setCenter(myLatlng);
			}
    	}
    }

    function initContact()
    {
    	var name = $('#form_name');
    	var email = $('#form_email');
    	var message = $('#form_message');
    	var nameFocus = $('.name_focus');
    	var emailFocus = $('.email_focus');

    	/* hide placeholder text on focus and show it again on lost focus */
    	name.focus(function()
		{
			name.attr("placeholder", "");
			nameFocus.css({'visibility':"visible", 'opacity':"1"});
		});

		name.blur(function()
		{
			name.attr("placeholder", "Name");
			nameFocus.css({'visibility':"hidden", 'opacity':"0"});
		});

		email.focus(function()
		{
			email.attr("placeholder", "");
			emailFocus.css({'visibility':"visible", 'opacity':"1"});
		});

		email.blur(function()
		{
			email.attr("placeholder", "Email");
			emailFocus.css({'visibility':"hidden", 'opacity':"0"});
		});

		message.focus(function()
		{
			message.attr("placeholder", "");
		});

		message.blur(function()
		{
			message.attr("placeholder", "Your Message");
		});
    }

    function initScrolling()
    {
    	var links = $('.nav_links');
    	links.each(function()
    	{
    		var ele = $(this);
    		var target = ele.data('scroll-to');
    		ele.on('click', function(e)
    		{
    			e.preventDefault();
    			$(window).scrollTo(target, 1500, {offset: -80, easing: 'easeInOutQuart'});
    		});
    	});

    	var fsMenuLinks = $('.fs_nav_links');
    	fsMenuLinks.each(function()
    	{
    		var ele = $(this);
    		var target = ele.data('scroll-to');
    		ele.on('click', function(e)
    		{
    			e.preventDefault();
    			fsMenuClose();
    			$(window).scrollTo(target, 1500, {offset: -80, easing: 'easeInOutQuart'});
    		});
    	});

    	// Scroll To Buttons

    	var btn = $('.scroll_to_button');
    	btn.each(function()
    	{
    		var ele = $(this);
    		ele.on('click', function()
	    	{
	    		$(window).scrollTo(ele.data('scroll-to'), 1500, {offset: -80, easing: 'easeInOutQuart'});
	    	});
    	});
    }
});