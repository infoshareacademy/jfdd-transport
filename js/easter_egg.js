$(function () {
    $(window).on('keyup', function (e) {
        if (e.ctrlKey && (e.which === 88)) { //88 is the 'x' key
            $('#easterEgg').removeClass('hide');
        }
    });

    $('#closeEasterEgg').on('click', function () {
        $('#easterEgg').addClass('hide');
    });
});