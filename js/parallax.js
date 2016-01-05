$(document).ready(function () {
    $(window).on('scroll', function () {
        $('.intro').css('margin-bottom', $(window).scrollTop() * -.7);
    });

    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });
});
