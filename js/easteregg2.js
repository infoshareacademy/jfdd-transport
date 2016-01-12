var linie = [41, 47, 14,];
var points = [];

$(document).ready(function () {

    var $easterEgg2 = $('#easterEgg2');
    $('#button-gray').on('click', function () {
        $('#easterEgg2').removeClass('hide');
    });

    $('#closeEasterEgg2').on('click', function () {
        $easterEgg2.addClass('hide');
    });

    var playGame = function () {
        $('#easterEgg2Intro').addClass('hide');
        $easterEgg2.removeClass('hide');
        $easterEgg2.addClass('gameBackground');
        $('#gameScore').removeClass('hide');

        grass = document.createElement('div');
        $(grass).addClass('grass')
            .appendTo($("#easterEgg2"));


        var sec = 20;
        var running = true;
        var timer = setInterval(function() {
            $('#gameScore span').text(sec--);
            if (sec == -1) {
                $('#gameScore').fadeOut('fast');
                clearInterval(timer);
            }
        }, 1000);

    };

    var busOnGo = function(){
        setInterval(function() {

            var b1 = document.createElement('div');
                    $(b1).addClass('bus1 buses')
                        .html(linie.random())
                        .appendTo($("#easterEgg2"))
                        .animate({"left": "1500px"}, generateRandomValue(2500, 6500))
                        .css('left', function () {
                            return $(this).offset().left;
                        })
                        .click(function () {
                            $(this).remove();

                            if (linie.random()== 41) {
                                $(this).click(points.push(1))
                            } else {points.push(-10)}


                        });

            b2 = document.createElement('div');
            $(b2).addClass('bus2 buses')
                .html(linie.random())
                .appendTo($("#easterEgg2"))
                .animate({"left":"1500px"}, generateRandomValue(2500, 6500))
                .css('left', function(){ return $(this).offset().left; })
                .animate({"left":"1500px"}, generateRandomValue(2500, 6500))
                .click(function () {
                    var actualPosition = $(b2).offset().left;
                    $(this).remove();
                })

            b3 = document.createElement('div');
            $(b3).addClass('bus3 buses')
                .html(linie.random())
                .appendTo($("#easterEgg2"))
                .animate({"right":"1500px"}, generateRandomValue(2500, 6500))
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1500px"}, generateRandomValue(2500, 6500))
                .click(function () {
                    var actualPosition = $(b3).offset().left;
                    $(this).remove();
                })

            b4 = document.createElement('div');
            $(b4).addClass('bus4 buses')
                .html(linie.random())
                .appendTo($("#easterEgg2"))
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1500px"}, generateRandomValue(2500, 6500))
                .click(function () {
                    var actualPosition = $(b4).offset().left;
                    $(this).remove();
                })


        }, 3000);
    }


    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    };

    var sumArray = function(points) {
        for (var index = 0,
               length = points.length,
               sum = 0;
            index < length;
            sum += points[index++]
        );
        return sum;
    };


    $('#startEasterEggGame2').on('click', function () {
        playGame();
        //runBus(6);
        busOnGo();
    });
});


//Helper functions from AgMo
function generateRandomValue(minValToGenerate, maxValToGenerate) {
    return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
}

