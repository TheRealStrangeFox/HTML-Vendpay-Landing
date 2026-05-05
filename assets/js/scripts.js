(function ($) {

	'use strict';

	/**
	 * Table Of Content
	 * 
	 *  1. [Preloader]          - Loading Page
	 *
	 */

	//1. [Preloader]          - Loading Page
	$(window).on('load', function () {
		// Animate loader off screen
		$("#section-preloader").fadeOut("slow");
		// Remove [d-none] class from swiper slider after page load
		$('.swiper-wrapper').removeClass('d-none');
	});

	$(document).ready(function () {
		// 2. [Navigation Menu] - Header Menu
		$('.dropdown-menu .dropdown-toggle').on('click', function (e) {
			if (!$(this).next().hasClass('show')) {
				$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
			}
			$(this).next(".dropdown-menu").toggleClass('show');
			return false;
		});
		//for product mega menu
		$('.product-heading').on('click', function () {
			if (!$(this).next().hasClass('active')) {
				$('.product-dropdown-list').removeClass('active');
				$(this).next().addClass('active');
			}
			else if ($(this).next().hasClass('active')) {
				$(this).next().removeClass('active');
			}
			return false;
		});
		$('.carousel-control-prev, .carousel-control-next').click(function (e) {
			e.preventDefault();
			$(this).parent().parents('.dropdown-menu').addClass('active')

		});

		// 3. [Navigation Menu]	- Burger Menu
		$('#sidebarCollapse').on('click', function () {
			$('.collapse.in').toggleClass('in');
			// Change icon collapse
			$(this).toggleClass('active');
		});

		//4. [CSS Animate, Waypoint, EZ Animate]		- Animate
		InitWaypointAnimations({
			animateClass: "ez-animate"
		});

		//5. [Show hide Selected Price]	-	Section Pricing 1
		$('#section-pricing1').on('mouseover', '.item', function () {
			$('#section-pricing1 .item.selected').toggleClass('selected');
		});

		$('#section-pricing1').on('mouseleave', '.item', function () {
			$('#section-pricing1 .item.active').addClass('selected');
		});

		// 6. [SCROLL] - Smooth Scroll
		if ($(window).width()) {
			$('a.scroll-down').on('click', function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

					if (target.length) {
						$('html, body').animate({
							scrollTop: target.offset().top - 0
						}, 500);
						return false;
					}
				}
			});
		}

		// 8. [Language Switcher] - Language Selection
		// Translation object

		// Function to translate elements
		function translatePage(lang) {
			// Translate text content
			$('[data-translate]').each(function () {
				var key = $(this).data('translate');
				if (translations[lang] && translations[lang][key]) {
					$(this).text(translations[lang][key]);
				}
			});

			// Translate placeholders
			$('[data-translate-placeholder]').each(function () {
				var key = $(this).data('translate-placeholder');
				if (translations[lang] && translations[lang][key]) {
					$(this).attr('placeholder', translations[lang][key]);
				}
			});
		}

		// Language switcher variables
		var $languageSwitcher = $('.language-switcher');
		var $langSelector = $languageSwitcher.find('.lang-selector');
		var $langMenu = $languageSwitcher.find('.lang-menu');
		var $langToggle = $languageSwitcher.find('.lang-toggle');

		// Function to close language menu
		function closeLanguageMenu() {
			$langMenu.removeClass('show');
			$langToggle.attr('aria-expanded', 'false');
		}

		// Function to toggle language menu
		function toggleLanguageMenu() {
			var isOpen = $langMenu.hasClass('show');
			if (isOpen) {
				closeLanguageMenu();
			} else {
				$langMenu.addClass('show');
				$langToggle.attr('aria-expanded', 'true');
			}
		}

		// Get saved language from localStorage or default to 'en'
		var currentLang = localStorage.getItem('selectedLanguage') || 'en';
		$languageSwitcher.find('.current-lang').text(currentLang.toUpperCase());

		// Update active state
		$languageSwitcher.find('.lang-option').removeClass('active');
		$languageSwitcher.find('.lang-option[data-lang="' + currentLang + '"]').addClass('active');

		// Translate page on load
		translatePage(currentLang);

		// Handle toggle button click
		$langToggle.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			toggleLanguageMenu();
		});

		// Handle language selection
		$languageSwitcher.find('.lang-option').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var selectedLang = $(this).data('lang');

			// Save to localStorage
			localStorage.setItem('selectedLanguage', selectedLang);

			// Update display
			$languageSwitcher.find('.current-lang').text(selectedLang.toUpperCase());

			// Update active state
			$languageSwitcher.find('.lang-option').removeClass('active');
			$(this).addClass('active');

			// Translate page
			translatePage(selectedLang);

			// Close menu
			closeLanguageMenu();
		});

		// Close menu when clicking outside
		$(document).on('click', function (e) {
			if (!$langSelector.is(e.target) && $langSelector.has(e.target).length === 0) {
				closeLanguageMenu();
			}
		});

	});

	// XX. [Navigation Menu] - Add Background on SCroll
	$(document).on('scroll', function () {
		if ($(this).scrollTop() > 10) {

			$('#section-navbar1, #section-navbar2').addClass('sticky-menu');

		} else {

			$('#section-navbar1, #section-navbar2').removeClass('sticky-menu');

		}
	});


})(jQuery);

