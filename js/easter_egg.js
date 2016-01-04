$(function () {
    $(window).on('keyup', function (e) {
        if (e.ctrlKey && (e.which === 88)) { //88 is the 'x' key
            $('#easterEgg').removeClass('hide');
        }
    });

    $('#closeEasterEgg').on('click', function () {
        $('#easterEgg').addClass('hide');
    });

    $('#startEasterEggGame').on('click', function () {
        gamePlay.startGame();
    });

    var gameDisplay = {
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        }
    };

    var gamePlay = {
        startGame: function () {
            gameDisplay.hideGameIntro();
            console.log('Bring it on!');
        }
    };
});