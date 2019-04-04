; (function ($, window, document, undefined) {
	"use strict";

	window.setEqualHeight = function() {
		$('.equalHeight').matchHeight();
		$('.equalRow').matchHeight(true);
		$('.blocks .block').matchHeight();
		$('.slider .block').matchHeight();
		$.fn.matchHeight._maintainScroll = true;
		$.fn.matchHeight._update();
	};

	window.setImageMedia = function() {
		if ($('.block.image.popup').length > 0) {
            $('.block.image.popup').lightGallery({
                selector: '.media a',
                controls: false,
                fullScreen: false,
                zoom: false,
                counter: false,
                hash: false,
				share: false
            });
        }
	};

	window.setGalleryMedia = function() {
		if ($('.gallery .popup').length > 0) {
            $('.gallery .popup').lightGallery({
                selector: 'a',
                controls: true,
                fullScreen: false,
                zoom: false,
                counter: false,
                hash: false,
				share: false
            });
        }
	};

	window.setVideoMedia = function() {
		if ($('.block.video.popup').length > 0) {
            $('.block.video.popup').lightGallery({
                selector: '.media a',
                controls: true,
                fullScreen: false,
                zoom: false,
                counter: false,
                hash: false,
				share: false,
				youtubePlayerParams: {
					rel: 0
				}
            });
        }
	};

	window.setSlider = function () {
		var flickitySlider = {
		    prevNextButtons: false,
		    pageDots: false,
		    cellAlign: 'left',
		    wrapAround: true,
		    cellSelector: 'li',
		    autoPlay: 7000,
		    imagesLoaded: true,
		    pauseAutoPlayOnHover: true
		};

		$('.slider .blockEntry').each(function () {
	        if ($('.slider.four-columns li').length > 4) {
				$('.slider.four-columns .blockEntry').flickity(flickitySlider);
	        }
	        if ($('.slider.three-columns li').length > 3) {
				$('.slider.three-columns .blockEntry').flickity(flickitySlider);
	        }
	        if ($('.slider.two-columns li').length > 2) {
				$('.slider.two-columns .blockEntry').flickity(flickitySlider);
	        }
			if ($('.slider.one-column li').length > 1) {
				$('.slider.one-column .blockEntry').flickity(flickitySlider);
	        }
	    });
	};

	window.setGallerySlider = function () {
		var flickitySlider = {
		    prevNextButtons: false,
		    pageDots: false,
		    cellAlign: 'left',
		    wrapAround: true,
		    cellSelector: 'li',
		    autoPlay: 7000,
		    imagesLoaded: true,
		    pauseAutoPlayOnHover: true
		};

		$('.gallery-slider .blockEntry').each(function () {
	        if ($('.gallery-slider.four-columns li').length > 4) {
				$('.gallery-slider.four-columns .blockEntry').flickity(flickitySlider);
	        }
	        if ($('.gallery-slider.three-columns li').length > 3) {
				$('.gallery-slider.three-columns .blockEntry').flickity(flickitySlider);
	        }
	        if ($('.gallery-slider.two-columns li').length > 2) {
				$('.gallery-slider.two-columns .blockEntry').flickity(flickitySlider);
	        }
			if ($('.gallery-slider.one-column li').length > 1) {
				$('.gallery-slider.one-column .blockEntry').flickity(flickitySlider);
	        }
	    });
	};


	window.initMasonry = function() {
		if ($('.masonry').length > 0) {
			$('.masonry .blockEntry').simplemasonry();
		}
	};

	window.setCover = function () {
		if ($('.coverItem').length <= 1) {
			$('.cover').each(function () {
				$(this).removeClass('is-hidden');
			});
		} else {
			$('.cover').each(function () {
				var sliderDisabled = $(this).data('sliderdisabled') == 'True' ? true : false;
				var orderBy = $(this).data('orderby');
				if (orderBy == 'random') {
					$(this).randomize('li');
				}

				if (sliderDisabled) {
					var li = $(this).children(".coverItem");
					li.detach();
					$(this).append(li[0]);
					$(this).removeClass('is-hidden');
				}
				else {
					var playWholeVideo = true;

					$(this).flickity({
						prevNextButtons: false,
						pageDots: false,
						cellSelector: '.coverItem',
						draggable: false,
						freeScroll: false,
						wrapAround: true,
						autoPlay: 7000,
						pauseAutoPlayOnHover: false,
						imagesLoaded: true,
						on: {
							select: function (index) {
								var flkty = this;
								$(this.selectedElement).find('video').each(function (i, video) {
									if (playWholeVideo) {
										flkty.stopPlayer();
										video.loop = false;
										video.on('ended',function(e, i){
											flkty.next();
											flkty.player.play();
										});
									}
									video.play();
								});
							},
							change: function (index) {
								if (!playWholeVideo) {
									var previousIndex = index == 0 ? this.slides.length - 1 : index - 1;
									var previousElement = this.slides[previousIndex].getCellElements();
									$(previousElement).find('video').each(function (i, video) {
										video.pause();
									});
								}
							}
						}
					});
				}
			});
		}
	};

	window.setQuotes = function() {
		if ($('.quote.multi').length > 0) {
			$('.quote.multi ul').each(function () {
				$(this).flickity({
					prevNextButtons: false,
					pageDots: false,
					cellSelector: 'li',
					draggable: false,
					freeScroll: false,
					wrapAround: true,
					autoPlay: 7000,
					pauseAutoPlayOnHover: false,
					imagesLoaded: true
				});
			});
		}
	};

	window.setFAQ = function() {
		$('.faqItem').on('click touch', function () {
			$('.faqItem', $(this).parents('ul:first')).removeClass('active');
    		$(this).toggleClass('active');
		});
	};

	window.setTabs = function() {
		$( ".tabs li" ).click(function() {
	        $(this).toggleClass('active').siblings().removeClass('active');
	        var index = $(this).index();
	        $(this).parent().parent().find(".tabContent .child-" + index ).toggleClass('active').siblings().removeClass('active');
	    });
	};

	window.setFixed = function() {
	    $(window).scroll(function() {
	        if ($(this).scrollTop() > 10) {
	            $('body').addClass("fixedTop");
	        } else {
	            $('body').removeClass("fixedTop");
	        }
	    });
	    $(document).ready(function() {
	        if ($(this).scrollTop() > 10) {
	            $('body').addClass("fixedTop");
	        } else {
	            $('body').removeClass("fixedTop");
	        }
	    });
	};

	window.setSectionScroll = function () {
		$('html, body').sectionScroll({
			sectionsClass: 'sectionItem',
			topOffset: 0,
			titles: true,
			enableHash: true,
			enableBullets: false
		});
	};

	window.backToTop = function () {
		$(window).scroll(function() {
	        if ($(this).scrollTop() > 100) {
	            $('.back-to-top').addClass("active");
	        } else {
	            $('.back-to-top').removeClass("active");
	        }
	    });
		$('.back-to-top').on('click', function () {
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	};

	window.openPopup = function(url, title, w, h) {
	    var left = (screen.width / 2) - (w / 2);
	    var top = (screen.height / 2) - (h / 2);
	    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	};

	window.C2GFavorites_ShowCount = function(count){
		return count > 0;
	}

	window.GetCategoryCountFormat = function(){
		return '{0}';
	}

	$(document).ready(function() {
        
        $('.mapControl .formContainer').on('touchstart click', function (e) {
			e.preventDefault();
			$('.mapControl .mapsCon').addClass('active');
		});      
        
        $('#closeTravelmode').on('touchstart click', function (e) {
			e.preventDefault();
			$('.mapControl .mapsCon').removeClass('active');
		});

		// MOBILEMENU
		$('#hamburger').on('touchstart click', function (e) {
			e.preventDefault();
			$('.menu, .page').toggleClass('menu-opened');
			$('html').toggleClass('menu-open');
		});

		$('.mobileMenu .listItem_Level0_Children').append( $("<span class='symbol open'></span>") );
		$('.mobileMenu .listItem_Level0_Children .symbol').first().remove();

		$('.mobileMenu .open').click(function() {
			$(this).toggleClass('open close');
			$(this).prev().slideToggle();
		});

		$('.search-trigger').on('click', function(e){
			e.preventDefault();
			$('.search-trigger').addClass('is-visible');
			$('.search-popup').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('.search-popup').find('input').focus().end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			});
		});

		$('.search-popup').click(function(){
			$('.search-trigger').removeClass('is-visible');
			$('.search-popup').removeClass('is-visible');
		}).children().click(function (element) {
			if ($(element.target).attr('class').indexOf('close') == -1) {
				return false;
			}
		});


		// FILTERED SEARCH
		$('.filterButton').on('touchstart click', function (e) {
            e.preventDefault();
            $('.filtering').toggleClass('active');
			$('.filterFiller').toggleClass('active');
        });
		$('.filterFiller, .filterClose').on('touchstart click', function (e) {
            e.preventDefault();
            $('.filtering').removeClass('active');
			$('.filterFiller').toggleClass('active');
        });

	});

	$(document).keyup(function(e){
		if(e.which === 27) {
			$('.search-trigger').removeClass('is-visible');
			$('.search-popup').removeClass('is-visible');
		}
	});

})(jQuery, window, document);
