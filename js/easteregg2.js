
$(document).ready(function () {
    var $easterEgg2 = $('#easterEgg2');
    $('#button-gray').on('click', function () {
        $easterEgg2.removeClass('hide');
    });

    $('#closeEasterEgg2').on('click', function () {
        $easterEgg2.addClass('hide');
    });

    $('#startEasterEggGame2').on('click', function () {
        playGame();
    });

    var playGame = function () {
        $('#easterEgg2Intro').addClass('hide');
        $('#easterEgg2').addClass('gameBackground');
        $('#gameScore').removeClass('hide');

    };



            });





