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
                height:'80px'
            }, 600);
        }
    } else {
        if ($nav.data('size') == 'small') {
            $nav.data('size','big').stop().animate({
                height:'100px'
            }, 600);
        }
    }
});