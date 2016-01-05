
$(document).ready(function(){
    $(window).on('scroll', function() {
        $('.intro').css('margin-bottom', $(window).scrollTop() * -.7);
    });
});
