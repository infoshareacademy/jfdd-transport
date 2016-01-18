$(document).ready(function () {
    function setBackgroundPosition() {

        $('.intro').css('background-position-y', 60 + $(window).scrollTop() * .6);
    }
    $(window).on('load scroll', setBackgroundPosition);

    /**
     * Code responsible for smooth scrolling
     */

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

    /**
     * RWD CODE----------------------------------------------------
     */
    if(window.innerWidth > 750) {
        $("#nav").attr("style");
    }

    $("#nav").addClass("js");
    $("#nav").addClass("js").before('<div id="menu">☰</div>');
    $("#menu").click(function(){
        $("#nav").toggle();
        $(window).resize(function(){
            if(window.innerWidth < 750) {
                $("#nav").removeAttr("style");
            } else { $("#nav").attr("style");}
        });
    });
});


