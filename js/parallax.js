$(document).ready(function () {
    function setBackgroundPosition() {
        $('.intro').css('background-position-y', 60 + $(window).scrollTop() * -.4);
    }

    $(window).on('load scroll', setBackgroundPosition);


    var $root = $('html, body');
    $('a').click(function () {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top -120
        }, 600, function () {
            window.location.hash = href;
        });
        return false;
    });
});


