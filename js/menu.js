/**
 * Created by anna on 08.01.16.
 */
$(function(){
    $('.navigationBar').data('size','big');
});

$(window).scroll(function(){
    var $nav = $('.navigationBar');

    if ($('body').scrollTop() > 0) {

        if(window.innerWidth < 750) {
            $("#nav").hide();
        }

        if ($nav.data('size') == 'big') {
            $nav.data('size','small').stop().animate({
                height:'60px',
            }, 600);
            $nav.find('.logo').stop().animate({
                height: '60px'
            }, 600);
            $nav.find('ul').stop().animate({
                marginTop: '0px',
                marginBottom: '0px'
            }, 600);
            $nav.find('#menu').stop().animate({
                paddingTop: '0px'
            }, 600);
        }
    } else {
        if ($nav.data('size') == 'small') {
            $nav.data('size','big').stop().animate({
                height:'100px'
            }, 600);
            $nav.find('.logo').stop().animate({
                height: '85px'
            }, 600);
            $nav.find('ul').stop().animate({
                marginTop: '20px',
                marginBottom: '20px'
            }, 600);
            $nav.find('#menu').stop().animate({
                paddingTop: '20px'
            }, 600);
        }
    }
});