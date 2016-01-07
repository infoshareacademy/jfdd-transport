
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

        game.generateBuses(3, [1, 2, 3]);
        $('.vehicles').each(function (index, element) {
            game.runABus(element, generateRandomValue(0, 2000), 350); //From 0 up to 2000 milliseconds \
//            // so as not to have the user waiting too long for the buses to show up at the start \
//            // of the game.
        });

    };

                var game = {
                    hideGameIntro: function () {
                        $('#easterEgg2Intro').addClass('hide');
                    },

                    generateBuses: function (howManyToGenerate, indexes) {
                        for (var i = 1; ; i++) {
                            var $bus = $('<div>');
                            $bus.addClass('vehicles vehicle' + indexes[i - 1]);

                        }
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





