/*
 *  jQuery Section Scroll v2
 *  Contributor: https://github.com/sylvainbaronnet
 *
 *  Copyright (c) 2016 Danish Iqbal
 *  http://plugins.imdanishiqbal.com/section-scroll
 *
 *  Licensed under MIT
 *
 */
(function ($) {
	'use strict';

	$.fn.sectionScroll = function (options) {
		var $container = this,
			$window = $(window),
			$section_number = 1,
			lastName,
			settings = $.extend({
				bulletsClass: 'section-bullets',
				sectionsClass: 'scrollable-section',
				scrollDuration: 1000,
				titles: true,
				enableHash: true,
				enableBullets: true,
				enableAnchorClicks: true,
				topOffset: 0,
				easing: ''
			}, options);

		var $sections = $('.' + settings.sectionsClass);
		var $bullets = $('<div class="sectionNav"><ul class="' + settings.bulletsClass + '"></ul></div>');
		if (settings.enableBullets) {
			$bullets.prependTo($container);
		}

		/* Build navigation */
		var bullets_html = '';
		$sections.each(function () {

			var $this = $(this);
			var title = ($this.data('section-title') || '').toLowerCase();
			var sectionTitle = title.split(" ").join("-").replace(/['.@#*+&?^${}()|[\]\\]/g, '');
			if (sectionTitle !== '') {
				//$('<a name="' + sectionTitle + '"></a>').prependTo($this);
				if ($this.children().length === 0 || ($this.children().first()[0].name === undefined) || ($this.children().first()[0].name !== undefined && $this.children().first()[0].name.toLowerCase() !== sectionTitle.toLowerCase())) {
					var anchorElement = $('<a name="' + sectionTitle + '"></a>');
					anchorElement.prependTo($this);
				}

				var bullet_title = settings.titles ? '<span class="tooltip">' + title + '</span><span class="selector"></span>' : '';
				bullets_html += '<li><a title="' + title + '" href="#' + sectionTitle + '">' + bullet_title + '</a></li>';

				$section_number++;
			}
		});

		var $bullets_items = $(bullets_html).appendTo($bullets.find('ul'));

		var scrollItems = $bullets_items.map(function () {
			//var item = $($(this).find('a').attr('href'));
			var item = $('[name=' + $(this).find('a').attr('href').replace(/['.@#*+&?^${}()|[\]\\]/g, '') + ']').parent();
			if (item[0]) {
				return item;
			}
		});

		$bullets_items.on('click', function (e) {
			var href = $(this).find('a').attr('href');
			if (href !== '') {
				gotoAnchor(e, href);
			}
		});

		var gotoAnchor = function (e, href) {
			var offsetTop = href === '#' ? 0 : $('[name="' + href.replace('#', '') + '"], [id="' + href.replace('#', '') + '"]').length > 0 ? $('[name="' + href.replace('#', '') + '"], [id="' + href.replace('#', '') + '"]').offset().top : 0;

			$('html, body').stop().animate({
				scrollTop: offsetTop - settings.topOffset
			}, settings.scrollDuration, settings.easing, function () {
				$container.trigger('scrolled-to-section').stop();
			});

			if (e !== null) {
				e.preventDefault();
			}
		};

		$window.on('scroll', function () {
			var fromTop = $window.scrollTop() + ($window.height() / 2.5);
			var cur = scrollItems.map(function () {
				var sectionHeight = $(this).height();
				var sectionTop = $(this).offset().top;
				var sectionBottom = sectionTop + sectionHeight;
				if (sectionTop < fromTop && sectionBottom > fromTop) {
					return this;
				}
			});
			cur = cur.length > 0 ? cur[cur.length - 1] : [];
			var name = cur[0] ? $(cur[0]).children().first().attr('name') : '';

			if (lastName !== name) {
				$sections.removeClass('active-section');

				$(cur).addClass('active-section');
				$bullets_items
					.removeClass('active')
					.find('a[href="#' + name + '"]')
					.parent()
					.addClass('active');

				lastName = name;
				$.fn.sectionScroll.activeSection = cur;
				$container.trigger('section-reached');
			}
		});

		if (settings.enableHash) {
			$('body').on('section-reached', function () {
				if ($('body').find('.CMS2GO').length > 0) {
					return;
				}

				if ($('body').sectionScroll.activeSection.length > 0) {
					var section_title = $('body').sectionScroll.activeSection.data('section-title').split(" ").join("-").replace(/['.@#*+&?^${}()|[\]\\]/g, '').toLowerCase();
					if (section_title) {
						if ('#' + section_title !== document.location.hash) {
							window.history.replaceState(undefined, undefined, '#' + section_title);
						}
					}
				}
			});

			// FIX, TE: when an url with anchor is set in the menu we want the page to scroll to that anchor.
			setTimeout(function () {
				var anchor = window.location.hash;
				if (anchor !== undefined && anchor !== '') {
					gotoAnchor(null, anchor);
				}
			}, 100);
		}

		if (settings.enableAnchorClicks) {
			$('[onclick^="location.href="],[href^="#"]').each(function () {
				var bullets = $bullets_items;
				var found = bullets.find(this).length > 0;
				if (!found) {
					var href = $(this).attr('href');
					if (href === undefined) {
						href = $(this).attr('onclick').split('=')[1];
						if (href.startsWith('"')) {
							href = href.substring(1);
						}
						if (href.endsWith('"')) {
							href = href.substring(0, href.indexOf('"'));
						}
					}
					if (href && href !== '' && href.startsWith("#")) {
						$(this).attr('anchor', href.toLowerCase());
						//$(this).attr('href', '');
						$(this).prop('onclick', null).off('click');
						$(this).click(function (event) {
							var href = $(this).attr('anchor');
							gotoAnchor(event, href);
						});
					}
				}
			});
		}

		return $container;
	};
}(jQuery));
