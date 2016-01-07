
$(document).ready(function () {
    var $easterEgg2 = $('#easterEgg2');
    $('#button-gray').on('click', function () {
        $easterEgg2.removeClass('hide');
    });

    $('#closeEasterEgg2').on('click', function () {
        $easterEgg2.addClass('hide');
    });

    $('#startEasterEggGame2').on('click', function () {
        game.hideGameIntro();
        playGame();
    });


});




