$(function () {
    //EVENT HANDLERS to detect the key combination which opens the easter egg ('f' + '4'):
    var $easterEgg = $('#easterEgg');

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
            $easterEgg.removeClass('hide');
        }
        pressedKeys.f = false;
        pressedKeys[4] = false;
    });

    //EVENT HANDLERS to start and end the easter egg game:
    $('#startEasterEggGame').on('click', function () {
        game.hideGameIntro();
        playGame();
    });

    $('#closeEasterEgg').on('click', function () {
        $easterEgg.addClass('hide');
    });

    //GAMEPLAY
    var playGame = function () {
        //TODO turn off the $('#startEasterEggGame') event handler

        game.startGameCountdown(15); //Passing in number of seconds

        game.generateBuses(3, [1, 2, 3]);
        $('.vehicles').each(function (index, element) {
            game.runABus(element, generateRandomValue(0, 1500), 350); //From 0 up to 1500 milliseconds \
            // so as not to have the user waiting too long for the buses to show up at the start \
            // of the game.
        });

        game.countClicks();
    };

    var game = {
        startGameCountdown: function(seconds){
            var $gameCountdownEl = $('#gameCountdown');
            $gameCountdownEl.text(seconds);

            var decrementCountdown = function() {
                seconds -= 1;
                $gameCountdownEl.text(seconds);
                if (seconds < 1) {
                    clearInterval(startCounter);
                }
            };

            var startCounter = setInterval(decrementCountdown, 1000);
        },
        countClicks: function () {
            var clickCounter = 0;

            $('#easterEgg').on('click dblclick', '.vehicleDoorOpen', function (e) {
                var busDestination = $(e.target).parent().attr('data-destination'); //The 'data-destination' \
                // attribute holds information about the bus destination. The div where the bus sits is a \
                // parent of the door div.
                if (busDestination === 'obc') {
                    clickCounter += 1;
                } else {
                    clickCounter -= 10;
                    clickCounter = Math.max(0, clickCounter); //The counter doesn't go below zero, \
                    // so the user never gets a negative value score. If they lose all the points \
                    // by clicking the wrong buses, the counter will get reset to zero (the max method will \
                    // return zero for a negative value) and counting will start all over again.
                }
                console.log(clickCounter);
                $('#currentScore').text(clickCounter);
            });
        },
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        },
        runABus: function (whichBus, whenToStartRunning, whereToGo) {
            var drivingSpeed = generateRandomValue(400, 1500);
            window.setTimeout(function () {
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
        generateDestination: function (whichBus) {
            var destinations = ['110 Wrzeszcz PKP', '113 Orunia Gościnna', '116 Matemblewo',
                '127 Jasień PKM', '130 Dworzec Główny', '136 Niedźwiednik', '139 Oliwa PKP',
                '168 Kiełpino Górne', '179 Owczarnia', '199 Suchanino', '227 Chełm Cienista',
                '262 Jaworzniaków', '283 Politechnika SKM', '315 Hucisko', '574 Otomin',
                '512 Sobieszewo', '269 Osiedle Barniewice', '267 Bysewo', '212 Przegalina'];
            var boardIndex = game.getBusIndex(whichBus);
            var destination = function () {
                var text = '';
                if (generateRandomValue(0, 1)) { //There's fifty-fifty chance of the bus going to OBC. \
                    // If parameter is 'true' - the destination is OBC.
                    text += '4 Olivia Business Center';
                    whichBus.setAttribute('data-destination', 'obc');
                } else {
                    //Get a random destination from the destinations array:
                    var otherDestination = destinations[generateRandomValue(0, (destinations.length - 1))];
                    text += otherDestination;
                    whichBus.setAttribute('data-destination', otherDestination);
                }
                return text;
            };
            $('.infoBoard' + boardIndex).text(destination());
        },
        removeDestination: function (whichBus) {
            var boardIndex = game.getBusIndex(whichBus);
            $('.infoBoard' + boardIndex).text('');
            $(whichBus).removeAttr('data-destination');
        },
        generateBuses: function (howManyToGenerate, indexes) {
            for (var i = 0; ; i++) {
                var $bus = $('<div>');
                var $doorLeft = $('<div>');
                var $doorRight = $('<div>');
                $bus.addClass('inService vehicles vehicle' + indexes[i]);
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
            var $openDoorLeft = $(whichBus).find('div.vehicleDoorLeft');
            $openDoorLeft.addClass('vehicleDoorOpen');
        },
        openDoorRight: function (whichBus) {
            var $openDoorRight = $(whichBus).find('div.vehicleDoorRight');
            $openDoorRight.addClass('vehicleDoorOpen');
        },
        closeDoorLeft: function (whichBus) {
            var thisBus = $(whichBus);
            thisBus.find('div.vehicleDoorLeft.vehicleDoorOpen').removeClass('vehicleDoorOpen');
        },
        closeDoorRight: function (whichBus) {
            var thisBus = $(whichBus);
            thisBus.find('div.vehicleDoorRight.vehicleDoorOpen').removeClass('vehicleDoorOpen');
        },
        pickUpPassengers: function (whichBus) {
            var leftDoorDelay = generateRandomValue(200, 2000);
            var rightDoorDelay = generateRandomValue(200, 2000);

            window.setTimeout(function () {
                game.openDoorLeft(whichBus);
            }, leftDoorDelay);
            window.setTimeout(function () {
                game.openDoorRight(whichBus);
            }, rightDoorDelay);

            var leftDoorOpeningTime = generateRandomValue(15000, 15000);//Original value 2000, 5000. Setting a diff val for testing//todo change back
            var rightDoorOpeningTime = generateRandomValue(15000, 15000);//Original value 2000, 5000. Setting a diff val for testing//todo change back
            var totalTimeAtBusStop = Math.max(leftDoorDelay + leftDoorOpeningTime,
                    rightDoorDelay + rightDoorOpeningTime) + 500;

            window.setTimeout(function () {
                game.closeDoorLeft(whichBus);
            }, leftDoorDelay + leftDoorOpeningTime);
            window.setTimeout(function () {
                game.closeDoorRight(whichBus);
            }, rightDoorDelay + rightDoorOpeningTime);

            window.setTimeout(function () {
                //TODO Disable the onclick event handler
                game.runABus(whichBus, 0, 1000);
                $(whichBus).removeClass('inService');
                game.removeDestination(whichBus);
            }, totalTimeAtBusStop);
        },
        rerunBus: function (whichBusToRerun) {
            var indexOfBusToRerun = game.getBusIndex(whichBusToRerun);

            game.generateBuses(1, [indexOfBusToRerun]);
            var busToRerun = document.getElementsByClassName('vehicle' + indexOfBusToRerun)[0];
            game.runABus(busToRerun, generateRandomValue(100, 1000), 350);
        },
        getBusIndex: function (fromWhichBus) {
            var busIndex = fromWhichBus.className;
            busIndex = busIndex.slice(-1);
            return busIndex;
        }
    };

    //Helper functions
    function generateRandomValue(minValToGenerate, maxValToGenerate) {
        return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
    }
});