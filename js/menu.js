$(function(){
    $('.navigationBar').data('size','big');
});

$(window).scroll(function(){
    var nav = $('.navigationBar');
    if ($('body').scrollTop() > 0) {
        if (nav.data('size') == 'big') {
            nav.data('size','small').stop().animate({
                height:'60px'
            }, 600);
            nav.find('.logo').stop().animate({
                height: '60px'
            }, 600);
            nav.find('ul').stop().animate({
                marginTop: '0px',
                marginBottom: '0px'
            }, 600);
        }
    } else {
        if (nav.data('size') == 'small') {
            nav.data('size','big').stop().animate({
                height:'100px'
            }, 600);
            nav.find('.logo').stop().animate({
                height: '90px'
            }, 600);
            nav.find('ul').stop().animate({
                marginTop: '20px',
                marginBottom: '20px'
            }, 600);
        }
    }
});