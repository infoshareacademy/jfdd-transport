/**
 * Created by ASUS on 2016-01-04.
 */

$(document).ready(function(){


    $(window).on('scroll', function() {
        $('.intro').css('margin-bottom', $(window).scrollTop() * -.7);
    });
});
