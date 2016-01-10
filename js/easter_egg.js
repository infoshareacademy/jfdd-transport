$(function () {
    //EVENT HANDLERS to detect the key combination which opens the easter egg ('f' + '4'):
    var $easterEgg = $('#easterEgg');
    var gameover = false;
    var result = 0;
    var gameTimeouts = [];

    var pressedKeys = {
        f: false,
        4: false
    };

    $(window).on('keydown', function (e) {
        if (e.which === 70) {
            pressedKeys.f = true;
        }
        if (e.which === 52 || e.which === 100) { //The key code for '4' on the main keyboard is \
            // '52' and on the numpad - '100'.
            pressedKeys[4] = true;
        }
    });

    $(window).on('keyup', function (e) {
        if (pressedKeys.f === true && pressedKeys[4] === true) {
            $easterEgg.removeClass('donotdisplay');

            //EVENT HANDLER for the start game button:
            $('#startEasterEggGame').on('click', function () {
                console.log('Start. Gameover is: ' + gameover);

                game.hideGameIntro();
                playGame();
            });
        }
        pressedKeys.f = false;
        pressedKeys[4] = false;
    });

    //EVENT HANDLER for the end game button:
    $('#closeEasterEgg').on('click', function () {
        $easterEgg.addClass('donotdisplay');

        if (game.counter.isRunning) {
            console.log('ID of the game counter: ' + game.counter.id);
            clearInterval(game.counter.id);
            game.counter.id[0] = '';
        }
        console.log('Is counter running at closing: ' + game.counter.isRunning);

        game.stopGame();
        game.resetGame();

        $('#easterEggIntro').removeClass('donotdisplay');
        console.log('After closing. Gameover is: ' + gameover);
    });

    //GAMEPLAY
    var playGame = function () {
        $('#startEasterEggGame').off();

        gameover = false;
        gameTimeouts = [];

        game.startGameCountdown(game.time);

        game.generateBuses(3, [1, 2, 3]);
        $('.vehicles').each(function (index, element) {
            game.runABus(element, generateRandomValue(0, 1500), 350); //From 0 up to 1500 milliseconds \
            // so as not to have the user waiting too long for the buses to show up at the start \
            // of the game.
        });

        game.countClicks();
    };

    var endGame = function () {
        game.stopGame();
        $('#endOfGameInfo').removeClass('hide').hide().fadeIn(2500, game.showResults);
    };

    var game = {
        time: 15, //Game duration in seconds.
        startGameCountdown: function (seconds) {
            var $gameCountdownEl = $('#gameCountdown');
            $gameCountdownEl.text(seconds); //Write the initial value onto the screen.

            var decrementCountdown = function () {
                seconds -= 1;
                $gameCountdownEl.text(seconds);
                game.counter.isRunning = true;

                if (seconds < 1) {
                    clearInterval(game.counter.id[0]);
                    game.counter.isRunning = false;
                    console.log('Is counter running: ' + game.counter.isRunning);
                    endGame();
                }
            };

            game.counter.id[0] = setInterval(decrementCountdown, 1000);
            console.log('Counter id is: ' + game.counter.id);
        },
        counter: {
            isRunning: false,
            id: []
        },
        countClicks: function () {
            $easterEgg.on('click dblclick', '.vehicleDoorOpen', function (e) {
                var busDestination = $(e.target).parent().attr('data-destination'); //The 'data-destination' \
                // attribute holds information about the bus destination. The div where the bus sits is a \
                // parent of the door div.
                if (busDestination === 'obc') {
                    if (e.type !== 'dblclick') { //A double click is effectively counted as three clicks: \
                        // two regular clicks plus one double click (which would give the user 3 points instead \
                        // of 2 even though they clicked twice). Points are therefore given only for the single \
                        // clicks that were registered as part of a double click.
                        result += 1;
                        console.log('result ' + result + ', event type: ' + e.type); //TODO Remove after testing.
                    }
                } else {
                    if (e.type !== 'dblclick') {
                        result -= 10;
                    }
                    result = Math.max(0, result); //The counter doesn't go below zero, \
                    // so the user never gets a negative value score. If they lose all the points \
                    // by clicking the wrong buses, the counter will get reset to zero (the max method will \
                    // return zero for a negative value) and counting will start all over again.
                }
                $('#currentScore').text(result);
            });
        },
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('donotdisplay');
        },
        runABus: function (whichBus, whenToStartRunning, whereToGo) {
            if (gameover) {
                return;
            }

            var drivingSpeed = generateRandomValue(400, 1500);
            //Record timeout ID to the gameTimeouts array so that the timeout can be\
            //be stopped at the end of the game. (Same for all the timeouts).
            gameTimeouts[0] = window.setTimeout(function () {
                $(whichBus).animate({left: whereToGo + 'px'}, drivingSpeed, function () {
                    if ($(whichBus).hasClass('inService')) {
                        game.generateDestination(whichBus);
                        game.pickUpPassengers(whichBus);
                    } else {
                        $(whichBus).remove();
                        game.rerunBus(whichBus);
                    }
                });
            }, whenToStartRunning);
        },
        destinations: ['110 Wrzeszcz PKP', '113 Orunia Gościnna', '116 Matemblewo',
            '127 Jasień PKM', '130 Dworzec Główny', '136 Niedźwiednik', '139 Oliwa PKP',
            '168 Kiełpino Górne', '179 Owczarnia', '199 Suchanino', '227 Chełm Cienista',
            '262 Jaworzniaków', '283 Politechnika SKM', '315 Hucisko', '574 Otomin',
            '512 Sobieszewo', '269 Osiedle Barniewice', '267 Bysewo', '212 Przegalina'],
        generateDestination: function (whichBus) {
            if (gameover) {
                return;
            }

            var boardIndex = game.getBusIndex(whichBus);
            var destination = function () {
                var text = '';
                if (generateRandomValue(0, 1)) { //There's fifty-fifty chance of the bus going to OBC. \
                    // If parameter is 'true' - the destination is OBC.
                    text += '4 Olivia Business Center';
                    whichBus.setAttribute('data-destination', 'obc');
                } else {
                    //Get a random destination from the game.destinations array:
                    var otherDestination = game.destinations[generateRandomValue(0, (game.destinations.length - 1))];
                    text += otherDestination;
                    whichBus.setAttribute('data-destination', otherDestination);
                }
                return text;
            };
            $('.infoBoard' + boardIndex).text(destination());
        },
        removeDestination: function (whichBus) {
            if (gameover) {
                return;
            }

            var boardIndex = game.getBusIndex(whichBus);
            $('.infoBoard' + boardIndex).text('');
            $(whichBus).removeAttr('data-destination');
        },
        busColors: ['#55ACEE', '#8B0000', '#FF0000', '#FFE229', '#483D8B', '#228B22', '#FF4500', '#FFD700'],
        generateBuses: function (howManyToGenerate, indexes) {
            if (gameover) {
                return;
            }

            console.log(howManyToGenerate + "; " + indexes);
            for (var i = 0; ; i++) {
                //var busColors = [];
                var $bus = $('<div>');
                var $doorLeft = $('<div>');
                var $doorRight = $('<div>');
                var busColor = game.busColors[generateRandomValue(0, game.busColors.length - 1)];

                $bus
                    .addClass('inService vehicles vehicle' + indexes[i])
                    .css('background-color', busColor);
                //A bus that's 'inService' can pick up passengers.
                $doorLeft
                    .addClass('vehicleDoor vehicleDoorLeft')
                    .appendTo($bus);
                $doorRight
                    .addClass('vehicleDoor vehicleDoorRight')
                    .appendTo($bus);

                $($('p.infoBoard' + indexes[i]))
                    .after($bus);
                howManyToGenerate--;
                if (howManyToGenerate === 0) {
                    break;
                }
            }
        },
        openDoorLeft: function (whichBus) {
            if (gameover) {
                return;
            }

            var $openDoorLeft = $(whichBus).find('div.vehicleDoorLeft');
            $openDoorLeft.addClass('vehicleDoorOpenLeft vehicleDoorOpen');
        },
        openDoorRight: function (whichBus) {
            if (gameover) {
                return;
            }

            var $openDoorRight = $(whichBus).find('div.vehicleDoorRight');
            $openDoorRight.addClass('vehicleDoorOpenRight vehicleDoorOpen');
        },
        closeDoorLeft: function (whichBus) {
            if (gameover) {
                return;
            }

            var thisBus = $(whichBus);
            thisBus.find('div.vehicleDoorLeft.vehicleDoorOpen')
                .removeClass('vehicleDoorOpenLeft vehicleDoorOpen');
        },
        closeDoorRight: function (whichBus) {
            if (gameover) {
                return;
            }

            var thisBus = $(whichBus);
            thisBus.find('div.vehicleDoorRight.vehicleDoorOpen')
                .removeClass('vehicleDoorOpenRight vehicleDoorOpen');
        },
        pickUpPassengers: function (whichBus) {
            if (gameover) {
                return;
            }

            var leftDoorDelay = generateRandomValue(200, 2000);
            var rightDoorDelay = generateRandomValue(200, 2000);

            gameTimeouts[1] = window.setTimeout(function () {
                game.openDoorLeft(whichBus);
            }, leftDoorDelay);
            gameTimeouts[2] = window.setTimeout(function () {
                game.openDoorRight(whichBus);
            }, rightDoorDelay);

            var leftDoorOpeningTime = generateRandomValue(2000, 5000);
            var rightDoorOpeningTime = generateRandomValue(2000, 5000);
            var totalTimeAtBusStop = Math.max(leftDoorDelay + leftDoorOpeningTime,
                    rightDoorDelay + rightDoorOpeningTime) + 500;

            gameTimeouts[3] = window.setTimeout(function () {
                game.closeDoorLeft(whichBus);
            }, leftDoorDelay + leftDoorOpeningTime);
            gameTimeouts[4] = window.setTimeout(function () {
                game.closeDoorRight(whichBus);
            }, rightDoorDelay + rightDoorOpeningTime);

            gameTimeouts[5] = window.setTimeout(function () {
                game.runABus(whichBus, 0, 1000);
                $(whichBus).removeClass('inService');
                game.removeDestination(whichBus);
            }, totalTimeAtBusStop);
        },
        rerunBus: function (whichBusToRerun) {
            if (gameover) {
                return;
            }

            var indexOfBusToRerun = game.getBusIndex(whichBusToRerun);

            game.generateBuses(1, [indexOfBusToRerun]);
            var busToRerun = document.getElementsByClassName('vehicle' + indexOfBusToRerun)[0];
            game.runABus(busToRerun, generateRandomValue(100, 1000), 350);
        },
        getBusIndex: function (fromWhichBus) {
            var busIndex = fromWhichBus.className;
            busIndex = busIndex.slice(-1);
            return busIndex;
        },
        clearGameTimeouts: function () {
            for (var i = 0; i < gameTimeouts.length; i++) {
                clearTimeout(gameTimeouts[i]);
                console.log('clearing timeout ' + gameTimeouts[i]);
            }
        },
        showResults: function () {
            $('#gameResults').removeClass('hide').find('p').text(result);
            $('#playAgain').on('click', game.playAgain);
        },
        resetGame: function () {
            $('#playAgain').off();
            $('#gameResults').addClass('hide');
            $('#endOfGameInfo').addClass('hide')/*.fadeOut()*/;
            $('.vehicles').remove(); //Remove existing buses.

            $('.infoBoards').text(''); //Clear destinations from infoboards.
            $('#currentScore').text('0'); //Clear the displayed result.
            result = 0; //Reset the variable holding current result.
        },
        stopGame: function () {
            $easterEgg.off(); //Turns off the handler for counting clicks.
            gameover = true;

            console.log(gameTimeouts);
            game.clearGameTimeouts();
        },
        playAgain: function () {
            game.resetGame();
            playGame();
        }
    };

    //Helper functions
    function generateRandomValue(minValToGenerate, maxValToGenerate) {
        return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
    }
});