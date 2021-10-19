var slider1 = $("#slider1");
var slider2 = $("#slider2");

slider1.owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    touchDrag: true,
    responsive:{
        0:{
            items:1,
            nav: false,
            dots:true,
            autoplay: false
        },
        600:{
            items:2,
            nav: false,
            dots:true,
            autoplay: false
        },
        1024:{
            items:3
        },
        1200:{
            items:3
        },
        1440:{
            items:4
        }
    }
});

slider2.owlCarousel({
    loop:true,
    nav:true,
    margin:10,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    touchDrag: true,
    responsive:{
        0:{
            items:1,
            nav: false,
            dots:true,
            autoplay: false
        },
        600:{
            items:2,
            nav: false,
            dots:true,
            autoplay: false
        },
        1024:{
            items:3
        },
        1200:{
            items:3
        },
        1440:{
            items:4
        }
    }
});

jQuery('body').on('click','#slider1 .owl-next',function(){
    jQuery('#slider1').trigger('stop.owl.autoplay');
    var carousel = jQuery('#slider1').data('owl.carousel');
    carousel.settings.autoplay = false;
    carousel.options.autoplay = false;
});
jQuery('body').on('click','#slider1 .owl-prev',function(){
    jQuery('#slider1').trigger('stop.owl.autoplay');
    var carousel = jQuery('#slider1').data('owl.carousel');
    carousel.settings.autoplay = false;
    carousel.options.autoplay = false;
});
jQuery('body').on('click','#slider2 .owl-next',function(){
    jQuery('#slider2').trigger('stop.owl.autoplay');
    var carousel = jQuery('#slider2').data('owl.carousel');
    carousel.settings.autoplay = false;
    carousel.options.autoplay = false;
});
jQuery('body').on('click','#slider2 .owl-prev',function(){
    jQuery('#slider2').trigger('stop.owl.autoplay');
    var carousel = jQuery('#slider2').data('owl.carousel');
    carousel.settings.autoplay = false;
    carousel.options.autoplay = false;
});

function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}