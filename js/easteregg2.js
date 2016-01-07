/**
 * Created by ASUS on 2016-01-07.
 */
$(function () {
    //EVENT HANDLERS to detect the key combination which opens the easter egg ('f' + '4'):
    var $easterEgg2 = $('#easterEgg2');

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
            $easterEgg2.removeClass('hide');
        }
        pressedKeys.f = false;
        pressedKeys[4] = false;
    });

    //EVENT HANDLERS to start and end the easter egg game:
    $('#startEasterEggGame').on('click', function () {
        game.hideGameIntro();
        playGame();
    });

    $('#closeEasterEgg2').on('click', function () {
        $easterEgg2.addClass('hide');
    });

    //GAMEPLAY
    var playGame = function () {
        game.generateBuses(3, [1, 2, 3]);
        $('.vehicles').each(function (index, element) {
            game.runABus(element, generateRandomValue(0, 2000), 350); //From 0 up to 2000 milliseconds \
            // so as not to have the user waiting too long for the buses to show up at the start \
            // of the game.
        });
    };

    var game = {
        hideGameIntro: function () {
            $('#easterEggIntro').addClass('hide');
        },
        runABus: function (whichBus, whenToStartRunning, whereToGo) {
            var busTimer = window.setTimeout(function () {
                $(whichBus).animate({left: whereToGo + 'px'}, generateRandomValue(400, 2000), function () {
                    if ($(whichBus).hasClass('inService')) {
                        game.generateDestination(whichBus);
                        game.pickUpPassengers(whichBus);
                    } else {
                        /*game.removeDestination(whichBus);*/
                        $(whichBus).remove();
                        game.rerunBus(whichBus);
                    }
                });
                //The fastest bus would take 800 milliseconds to arrive at the stop, \
                // and the slowest 2 seconds. When the animation ends, the bus arrives \
                // at its stop and opens the door to let passengers in.
            }, whenToStartRunning);
        },
        generateDestination: function (whichBus) {
            /*var indexOfBoard = whichBus.className;
             indexOfBoard = indexOfBoard.slice(-1);*/
            var boardIndex = game.getBusIndex(whichBus);
            $('.infoBoard' + boardIndex).text('OBC');
        },
        removeDestination: function(whichBus) {
            /*var indexOfBoard = whichBus.className;
             indexOfBoard = indexOfBoard.slice(-1);*/
            var boardIndex = game.getBusIndex(whichBus);
            $('.infoBoard' + boardIndex).text('');
        },
        generateBuses: function (howManyToGenerate, indexes) {
            for (var i = 1; ; i++) {
                var $bus = $('<div>');
                var $doorLeft = $('<div>');
                var $doorRight = $('<div>');
                $bus.addClass('inService vehicles vehicle' + indexes[i - 1]);
                //A bus that's 'inService' can pick up passengers.
                $doorLeft
                    .addClass('vehicleDoor vehicleDoorLeft')
                    .appendTo($bus);
                $doorRight
                    .addClass('vehicleDoor vehicleDoorRight')
                    .appendTo($bus);

                $($('p.infoBoard' + indexes[i - 1]))
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
            game.openDoorLeft(whichBus);
            game.openDoorRight(whichBus);

            var $busWithOpenDoor = $('.vehicleDoorOpen');
            $busWithOpenDoor.on('click', function () {
                console.log('Można wsiadać.');//todo Enable clicking
            });

            var leftDoorTimeout = generateRandomValue(2000, 5000);
            var rightDoorTimeout = generateRandomValue(2000, 5000);
            var longerTimeout = Math.max(leftDoorTimeout, rightDoorTimeout) + 1000;

            var leftDoorTimer = window.setTimeout(function() {
                game.closeDoorLeft(whichBus);
            }, leftDoorTimeout);

            var rightDoorTimer = window.setTimeout(function() {
                game.closeDoorRight(whichBus);
            }, rightDoorTimeout);

            var longerTimer = window.setTimeout(function () {
                //todo Disable the onclick event handler
                game.runABus(whichBus, 0, 1000);
                $(whichBus).removeClass('inService');
                game.removeDestination(whichBus);
            }, longerTimeout);
        },
        rerunBus: function(whichBusToRerun) {
            /*var indexOfBusToRerun = whichBusToRerun.className;
             indexOfBusToRerun = indexOfBusToRerun.slice(-1);*/
            var indexOfBusToRerun = game.getBusIndex(whichBusToRerun);

            game.generateBuses(1, [indexOfBusToRerun]);
            var busToRerun = document.getElementsByClassName('vehicle' + indexOfBusToRerun)[0];
            game.runABus(busToRerun, generateRandomValue(500, 3000), 350);
        },
        getBusIndex: function(fromWhichBus) {
            var busIndex = fromWhichBus.className;
            console.log('przed ' + busIndex);
            busIndex = busIndex.slice(-1);
            console.log(busIndex);
            return busIndex;
        }
    };

    //Helper functions
    function generateRandomValue(minValToGenerate, maxValToGenerate) {
        return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
    }

    /*function getBusIndex(whichBus) {
     var busIndex = whichBus.className;
     busIndex = busIndex.slice(-1);
     }*/
});
