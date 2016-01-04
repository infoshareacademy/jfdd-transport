/**
 * Created by ASUS on 2016-01-04.
 */

$(document).ready(function(){
    //function parallax(){
    //    var scrolled = $(window).scrollTop();
    //    $('.intro').css('top', -(scrolled * 0.1) + 'px');
    //}
    //
    //$(window).scroll(function(){
    //    parallax();
    //});
    //$(window).scroll(function () {
    //    $(".intro").css("background-position","50% " + ($(this).scrollTop() / 5) + "px");
    //});

    $(window).on('scroll', function() {
        $('.intro').css('margin-top', $(window).scrollTop() * -.10);
    });
});
