$(document).ready(function () {
    $(window).on('scroll', function () {
        $('.intro').css('background-position-y', $(window).scrollTop() * -.7);
    });


    var $root = $('html, body');
    $('a').click(function() {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top
        }, 600, function () {
            window.location.hash = href;
        });
        return false;
    });
});


