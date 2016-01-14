$(document).ready(function () {

    /**
     * Code responsible for parallax
     */

    function setBackgroundPosition() {
        $('.intro').css('background-position-y', 60 + $(window).scrollTop() * .5);
    }
    $(window).on('load scroll', setBackgroundPosition);
});


