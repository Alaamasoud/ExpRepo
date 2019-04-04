//Flexdetails Page Sticky Nav
//Flexdetails Page Sticky Nav
//Flexdetails Page Sticky Nav

$(window).scroll(function(){
    if ($('.vacancies').length > 0) {
          var scroll = $(window).scrollTop(),
              header = $('.vacancies:not(.form) .coverContent');

          if (scroll >= 350) {
              header.addClass('sticky');
          } else if (scroll <= 350) {
              header.removeClass('sticky');
          }
    }
});

//Page Animation
//Page Animation
//Page Animation

; (function ($, window, document, undefined) {
    "use strict";

    $(document).ready(function () {

    const sr = window.sr = ScrollReveal({ mobile: false, cleanup: true })

    var easeMethod = 'cubic-bezier(0.5, -0.01, 0, 1.005)';

//    HEADER ANIMATION
    sr.reveal('header .headerContainer', {duration: 500,easing: easeMethod,delay: 100,origin: 'top',distance: '20px'});

//    SECTION-COVER IMAGE-LIGHT AND IMAGE-DARK ANIMATION
    sr.reveal('.section-cover .imageLight', {duration: 500,easing: easeMethod,delay: 600,opacity: 0,afterReveal: function(el) {$('.section-cover .imageLight').addClass('animation')}});
    sr.reveal('.section-cover .coverContent', {duration: 800,easing: easeMethod,delay: 2400,opacity: 0});

    sr.reveal('.section-cover .imageDark', {duration: 500,easing: easeMethod,delay: 600,opacity: 0,afterReveal: function(el) {$('.section-cover .imageDark').addClass('animation')}});
    sr.reveal('.section-cover .coverContent', {duration: 800,easing: easeMethod,delay: 2400,opacity: 0});


//    SECTION-RIGHTCONTENT IMAGE-ALL ANIMATION

    sr.reveal('.section-rightContent.imageLight', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-rightContent.imageLight').addClass('animation')}});
    sr.reveal('.section-rightContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-rightContent.imageDark', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-rightContent.imageDark').addClass('animation')}});
    sr.reveal('.section-rightContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-rightContent.imageBlue', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-rightContent.imageBlue').addClass('animation')}});
    sr.reveal('.section-rightContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-rightContent.imageGold', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-rightContent.imageGold').addClass('animation')}});
    sr.reveal('.section-rightContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

//    SECTION-LEFTCONTENT IMAGE-ALL ANIMATION

    sr.reveal('.section-leftContent.imageLight', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-leftContent.imageLight').addClass('animation')}});
    sr.reveal('.section-leftContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-leftContent.imageDark', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-leftContent.imageDark').addClass('animation')}});
    sr.reveal('.section-leftContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-leftContent.imageBlue', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-leftContent.imageBlue').addClass('animation')}});
    sr.reveal('.section-leftContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

    sr.reveal('.section-leftContent.imageGold', {duration: 500,easing: easeMethod,delay: 100,opacity: 0,afterReveal: function(el) {$('.section-leftContent.imageGold').addClass('animation')}});
    sr.reveal('.section-leftContent .block', {duration: 800,easing: easeMethod,delay: 1800,opacity: 0});

//    REST SECTIONS
//    REST SECTIONS
//    REST SECTIONS
    sr.reveal('.section-centered', {duration: 1000,easing: easeMethod,delay: 600,opacity:0});

    sr.reveal('.section-grid-8-4', {duration: 500,easing: easeMethod,delay: 100,opacity:0});
    sr.reveal('.section-grid-8-4 .grid_8', {duration: 500,easing: easeMethod,delay: 600,origin: 'left',distance: '50px'});
    sr.reveal('.section-grid-8-4 .grid_4', {duration: 500,easing: easeMethod,delay: 600,origin: 'right',distance: '50px'});

    sr.reveal('.section-splitRight', {duration: 500,easing: easeMethod,delay: 100,opacity:0});
    sr.reveal('.section-splitRight .grid_6:nth-child(1)', {duration: 500,easing: easeMethod,delay: 600,origin: 'right',distance: '50px'});
    sr.reveal('.section-splitRight .grid_6:nth-child(2)', {duration: 500,easing: easeMethod,delay: 600,origin: 'left',distance: '50px'});

    sr.reveal('.section-splitLeft', {duration: 500,easing: easeMethod,delay: 100,opacity:0});
    sr.reveal('.section-splitLeft .grid_6:nth-child(1)', {duration: 500,easing: easeMethod,delay: 600,origin: 'left',distance: '50px'});
    sr.reveal('.section-splitLeft .grid_6:nth-child(2)', {duration: 500,easing: easeMethod,delay: 600,origin: 'Right',distance: '50px'});

    sr.reveal('.section-dynamicContent', {duration: 500,easing: easeMethod,delay: 100,opacity:0});
    sr.reveal('.section-dynamicContent .blockEntry .item', {interval: 200,duration: 500,easing: easeMethod,delay: 600,origin: 'left',distance: '50px'});

    sr.reveal('.section-columns', {duration: 500,easing: easeMethod,delay: 100,opacity:0});
    sr.reveal('.section-columns .child', {interval: 200,duration: 500,easing: easeMethod,delay: 600,origin: 'left',distance: '50px'});



    });
})(jQuery, window, document);
