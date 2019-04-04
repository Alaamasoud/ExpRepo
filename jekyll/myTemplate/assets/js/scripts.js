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


      window.setSlider = function () {
          $('.slider .blockEntry').slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 1500,
              arrows: false,
            responsive: [
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
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

//    $('.tabIcons ul li .svgHolder').on('touchstart click', function (e) {
//            e.preventDefault();
//            $(this).toggleClass('active');
//        });




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
            topOffset: 40,
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

    $(window).on('load', function() {
//        $('ul.cmsTree').mtree({
//            collapsed: true, // Start with collapsed menu (only level 1 items visible)
//            close_same_level: true, // Close elements on same level when opening new node.
//            duration: 200, // Animation duration should be tweaked according to easing.
//            listAnim: true, // Animate separate list items on open/close element (velocity.js only).
//            easing: 'easeOutQuart', // Velocity.js only, defaults to 'swing' with jquery animation.
//        });


    });

    $(document).ready(function() {

        $('[data-tabLinks]').click(function () {
            $('.tabContent.active').removeClass('active').addClass('nonActive');
            $('.tabLinks.active').removeClass('active').addClass('nonActive');
            var index = $(this).data("index");
            $(this).addClass('active');
            console.log(index);
            $('[data-id="' + index + '"]').addClass('active').removeClass('nonActive');
        })


        // niceSelect
//      $('select').niceSelect();
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
