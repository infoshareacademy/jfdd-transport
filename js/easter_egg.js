$(function () {
    var pressedKeys = {
        f: false,
        4: false
    };
    //Event listeners to detect the key combination which opens the easter egg ('f4'):
    $(window).on('keydown', function (e) {
        if (e.which === 70) {
            pressedKeys.f = true;
        }
        if (e.which === 52) {
            pressedKeys[4] = true;
        }
    });

    $(window).on('keyup', function (e) {
        if (pressedKeys.f === true && pressedKeys[4] === true) {
            $('#easterEgg').removeClass('hide');
        }
        pressedKeys.f = false;
        pressedKeys[4] = false;
    });

    $('#closeEasterEgg').on('click', function () {
        $('#easterEgg').addClass('hide');
    });

    $('#startEasterEggGame').on('click', function () {
        playGame();
    });

    var playGame = function () {
        game.hideGameIntro();
        game.runBuses();
    };

    var game = {
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        },
        runBuses: function () {
            $('#vehicle1').animate({left: '50px'}, 250);
            $('#vehicle2').animate({left: '50px'}, 250);
            $('#vehicle3').animate({left: '50px'}, 250);
        }
    };
});