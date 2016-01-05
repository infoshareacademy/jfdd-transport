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
                game.runABus(element, game.generateRandomMilliseconds());
            });
            /*$('#vehicle1').animate({left: '50px'}, 250);
             $('#vehicle2').animate({left: '50px'}, 250);
             $('#vehicle3').animate({left: '50px'}, 250);*/
        },
        runABus: function (whichBus, whenToStartRunning) {
            var busTimer = window.setTimeout(function () {
                $(whichBus).animate({left: '50px'}, 250);
            }, whenToStartRunning);
        },
        generateRandomMilliseconds: function() {
            return (Math.random() * 2000); //From 0 up to 2000 milliseconds so as not to have \
            // the user waiting too long for the buses to show up.
        }
    };
});