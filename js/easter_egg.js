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
        if (e.which === 52 || e.which === 100) { //The key code for '4' on the numpad is '100'.
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
        game.runAllBuses();
    };

    var game = {
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        },
        runAllBuses: function () {
            $('.vehicles').each(function (index, element) {
                game.runABus(element, game.generateRandomValue(0, 2000)); //From 0 up to 2000 milliseconds \
                // so as not to have the user waiting too long for the buses to show up at the start \
                // of the game.
            });
        },
        runABus: function (whichBus, whenToStartRunning) {
            var busTimer = window.setTimeout(function () {
                $(whichBus).animate({left: '350px'}, game.generateRandomValue(500, 1000)); //The fastest \
                // bus would take 500 milliseconds to arrive at the stop, and the slowest 1 second.
            }, whenToStartRunning);
        },
        generateRandomValue: function (minValToGenerate, maxValToGenerate) {
            return Math.floor((Math.random() * (((maxValToGenerate - minValToGenerate) + 1)
            + minValToGenerate)));
        }
    };
});