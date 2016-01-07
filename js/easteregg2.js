
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
        //playGame();
    });

//GAMEPLAY
//    var playGame = function () {
//        game.generateBuses(3, [1, 2, 3]);
//        $('.vehicles').each(function (index, element) {
//            game.runABus(element, generateRandomValue(0, 2000), 350); //From 0 up to 2000 milliseconds \
//            // so as not to have the user waiting too long for the buses to show up at the start \
//            // of the game.
//        });
//    };

    var game = {
        hideGameIntro: function () {
            $('#easterEggIntro2').addClass('hide');
        }
    //    runABus: function (whichBus, whenToStartRunning, whereToGo) {
    //        var busTimer = window.setTimeout(function () {
    //            $(whichBus).animate({left: whereToGo + 'px'}, generateRandomValue(400, 2000), function () {
    //                if ($(whichBus).hasClass('inService')) {
    //                    game.generateDestination(whichBus);
    //                    game.pickUpPassengers(whichBus);
    //                } else {
    //                    /*game.removeDestination(whichBus);*/
    //                    $(whichBus).remove();
    //                    game.rerunBus(whichBus);
    //                }
    //            });
    //            //The fastest bus would take 800 milliseconds to arrive at the stop, \
    //            // and the slowest 2 seconds. When the animation ends, the bus arrives \
    //            // at its stop and opens the door to let passengers in.
    //        }, whenToStartRunning);
    //    },
    //    generateDestination: function (whichBus) {
    //        /*var indexOfBoard = whichBus.className;
    //         indexOfBoard = indexOfBoard.slice(-1);*/
    //        var boardIndex = game.getBusIndex(whichBus);
    //        $('.infoBoard' + boardIndex).text('OBC');
    //    },
    //    removeDestination: function (whichBus) {
    //        /*var indexOfBoard = whichBus.className;
    //         indexOfBoard = indexOfBoard.slice(-1);*/
    //        var boardIndex = game.getBusIndex(whichBus);
    //        $('.infoBoard' + boardIndex).text('');
    //    },
    //    generateBuses: function (howManyToGenerate, indexes) {
    //        for (var i = 1; ; i++) {
    //            var $bus = $('<div>');
    //            var $doorLeft = $('<div>');
    //            var $doorRight = $('<div>');
    //            $bus.addClass('inService vehicles vehicle' + indexes[i - 1]);
    //            //A bus that's 'inService' can pick up passengers.
    //            $doorLeft
    //                .addClass('vehicleDoor vehicleDoorLeft')
    //                .appendTo($bus);
    //            $doorRight
    //                .addClass('vehicleDoor vehicleDoorRight')
    //                .appendTo($bus);
    //
    //            $($('p.infoBoard' + indexes[i - 1]))
    //                .after($bus);
    //            howManyToGenerate--;
    //            if (howManyToGenerate === 0) {
    //                break;
    //            }
    //        }
    //    },
    //}
    //
    ////Helper functions
    //function generateRandomValue(minValToGenerate, maxValToGenerate) {
    //    return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
    //}

});





