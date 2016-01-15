/**
 * Created by anna on 08.01.16.
 */
$(function(){
    $('.navigationBar').data('size','big');
});

$(window).scroll(function(){
    var $nav = $('.navigationBar');
    if ($('body').scrollTop() > 0) {
        if ($nav.data('size') == 'big') {
            $nav.data('size','small').stop().animate({
                height:'60px'
            }, 600);
            $nav.find('.logo').stop().animate({
                height: '60px'
            }, 600);
            $nav.find('ul').stop().animate({
                marginTop: '0px',
                marginBottom: '0px'
            }, 600);
        }
    } else {
        if ($nav.data('size') == 'small') {
            $nav.data('size','big').stop().animate({
                height:'100px'
            }, 600);
            $nav.find('.logo').stop().animate({
                height: '90px'
            }, 600);
            $nav.find('ul').stop().animate({
                marginTop: '20px',
                marginBottom: '20px'
            }, 600);
        }
    }
});




function updatenavigationBarHeight() {
    navigationBarheight = $('.navigationBar').outerHeight();
}


var $root = $('html, body');
$('a').click(function () {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top  - 60
    }, 600, function () {
        window.location.hash = href;
    });
    return false;
});


/**
 * Code responsible for highlighting menu items on scroll
 */
$(window).scroll(function() {
    //updatenavigationBarHeight();
    var position = $(this).scrollTop() + 61;
    $('.navigationBar > nav > ul > li > a').each(function() {
        var href = $(this).attr('href');
        var target = $(href).offset().top;

        if (position >= target) {
            $('.navigationBar > nav > ul > li > a').removeClass('active');
            $('.navigationBar > nav > ul > li > a[href=' + href + ']').addClass('active');
        }

        var endOfAdditionalFunctionsSection = $('.additionalFunctionsSection').offset().top + $('.additionalFunctionsSection').outerHeight() ;
        if (position >= endOfAdditionalFunctionsSection) {
            $('.navigationBar > nav > ul > li > a').removeClass('active');
            $('.navigationBar > nav > ul > li > a[href=' + href + ']').addClass('active');
        }
    });
});