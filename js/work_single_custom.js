/* JS Document */

jQuery(document).ready(function($)
{
	"use strict";

	var ctrl = new ScrollMagic.Controller();
	var header = $('.header');
	var hamb = $('.hamburger_container_outer');
	var hambActive = false;

	setHeader();

	$(window).resize(function()
	{
		setHeader();
		// initParallax();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	// initParallax();
	initHamburger();
	initLettering();
	initGallery();

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

	// function initParallax()
	// {
	// 	$('.contact_background').parallax({imageSrc: 'images/contact_background.jpg'});
	// }

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

	function initGallery()
	{
		$('.gallery_light_item').magnificPopup(
		{
	        type: 'image',
	        closeOnContentClick: true,
	        closeBtnInside: false,
	        fixedContentPos: true,
	        mainClass: 'mfp-no-margins mfp-with-zoom', 
	        image: {
	            verticalFit: true
	        },
	        zoom:
	        {
	            enabled: true,
	         	duration:300
	     	},
	     	gallery: {
			    // options for gallery
			    enabled: true
			},
		});
	}
});