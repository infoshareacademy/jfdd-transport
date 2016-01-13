$(document).ready(function () {
    function setBackgroundPosition() {
        $('.intro').css('background-position-y', 60 + $(window).scrollTop() * -.4);
    }

    $(window).on('load scroll', setBackgroundPosition);


    var $root = $('html, body');
    $('a').click(function () {
        var href = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(href).offset().top - $('.navigationBar').outerHeight()
        }, 600, function () {
            window.location.hash = href;
        });
        return false;
    });


    /**
     * Code responsible for highlighting menu items on scroll
     */
    $(window).scroll(function() {

        var position = $(this).scrollTop() + $('.navigationBar').outerHeight();

        $('.navigationBar > nav > ul > li > a').each(function() {
            var href = $(this).attr('href');
            var target = $(href).offset().top;

            if (position >= target) {
                $('.navigationBar > nav > ul > li > a').removeClass('active');
                $('.navigationBar > nav > ul > li > a[href=' + href + ']').addClass('active');
            }

            var endOfAdditionalFunctionsSection = $('.additionalFunctionsSection').offset().top + $('.additionalFunctionsSection').outerHeight() ;
            if (position >= endOfAdditionalFunctionsSection) {
                $('.navigationBar > nav > ul > li > a').removeClass('active');
                $('.navigationBar > nav > ul > li > a[href=' + href + ']').addClass('active');
            }
        });
    });

});


