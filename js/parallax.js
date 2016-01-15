$(document).ready(function () {
    function setBackgroundPosition() {
        $('.intro').css('background-position-y', 60 + $(window).scrollTop() * -.4);
    }
    $(window).on('load scroll', setBackgroundPosition);
});


