$(function () {
    var keyPressed; //Get's assigned a string with the value of a key, if the user presses the 'f' or the '4' key. Used in event listeners.
    //Event listeners to detect the key combination (f4, as in Fantastic 4) which opens the easter egg:
    $(window).on('keydown', function (e) {
        if (e.which === 70) {
            keyPressed = 'f';
        }
        if (e.which === 52) {
            keyPressed = '4';
        }
    });

    $(window).on('keyup', function (e) {
        if ((keyPressed === 'f' && e.which === 52) || (keyPressed === '4' && e.which === 70)) {
            $('#easterEgg').removeClass('hide');
        }
    });

    $('#closeEasterEgg').on('click', function () {
        $('#easterEgg').addClass('hide');
    });

    $('#startEasterEggGame').on('click', function () {
        playGame();
    });

    var playGame = function () {
        game.hideGameIntro();
        console.log('Bring it on!');
    };

    var game = {
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        }
    };
});