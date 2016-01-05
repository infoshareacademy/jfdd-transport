$(document).ready(function () {
    $(window).on('scroll', function () {
        $('.intro').css('background-position-y', $(window).scrollTop() * -.7);
    });

    $('a[href^=#]:not([href=#])').on('click', function () {
        var element = $($(this).attr('href'));
        console.log(element.offset().top);
        $('html,body').animate({ scrollTop: element.offset().top },'normal', 'swing');
        return false;
    });
});


