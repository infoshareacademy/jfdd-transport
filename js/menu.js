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
                height:'60px'
            }, 600);
            $nav.find('.logo').stop().animate({
                height: '60px'
            }, 600);
            $nav.find('li').stop().animate({
                paddingTop: '15px'
            }, 600);
            $nav.find('#menu').stop().animate({
                paddingTop: '5px'
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
            $nav.find('li').stop().animate({
                paddingTop: '30px'
                //marginBottom: '20px'
            }, 600);
            $nav.find('#menu').stop().animate({
                paddingTop: '20px'
            }, 600);
        }
    }
});