var linie = [41, 47, 14];
var points = [];


$(document).ready(function () {

    var iniciateGame = function () {
            $('#easterEgg2').removeClass('hide');
            $('#closeEasterEgg2 span').removeClass('hide');
            $('#easterEgg2Intro').removeClass('hide');
    };

    var closeGame = function () {
        $('#easterEgg2').addClass('hide');
    };

    var playGame = function () {
        $('#easterEgg2Intro').addClass('hide');
        $('#easterEgg2').removeClass('hide').addClass('gameBackground');
        $('#gameScore').removeClass('hide');
        $('#prawaAutorskie a').removeClass('hide');

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        };

        var sec = 20;
        var running = true;
        var timer = setInterval(function() {
            $('#gameScore span').text(sec--);
            if (sec == -1) {
                $('#gameScore').fadeOut('fast');
                clearInterval(timer);
                closeGame();
                alert(
                    "Koniec gry! \nTwój wynik: " +
                    points.reduce(function(aktualnyWynik,kolejnyPunkt){
                        return aktualnyWynik+kolejnyPunkt;
                    }, 0)
                );
            }
        }, 1000);
    };



    var busOnGo = function(){
        var refreshIntervalId = setInterval(busOnGo, 2000);

        setInterval(function() {

            var b1 = document.createElement('div');
                    $(b1).addClass('bus1 buses')
                        .html(linie.random())
                        .appendTo$("#easterEgg2")
                        .animate({"left": "1800px"}, RandomValue(2000, 6500))
                        .css('left', function () {
                            return $(this).offset().left;
                        })
                        .click(function () {
                            $(this).remove();

                            if ($(this).html()== 41) {
                              points.push(1);
                            } else {
                                points.push(-10);
                            }
                        });

            b2 = document.createElement('div');
            $(b2).addClass('bus2 buses')
                .html(linie.random())
                .appendTo$("#easterEgg2")
                .css('left', function(){ return $(this).offset().left; })
                .animate({"left":"1800px"}, RandomValue(2000, 6500))
                .click(function () {
                    var actualPosition = $(b2).offset().left;
                    $(this).remove();
                });

            b3 = document.createElement('div');
            $(b3).addClass('bus3 buses')
                .html(linie.random())
                .appendTo$("#easterEgg2")
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1800px"}, RandomValue(2000, 6500))
                .click(function () {
                    var actualPosition = $(b3).offset().left;
                    $(this).remove();
                    if ($(this).html()== 41) {
                        points.push(1);
                    } else {
                        points.push(-10);
                    }
                });

            b4 = document.createElement('div');
            $(b4).addClass('bus4 buses')
                .html(linie.random())
                .appendTo$("#easterEgg2")
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1800px"}, RandomValue(2000, 6500))
                .click(function () {
                    var actualPosition = $(b4).offset().left;
                    $(this).remove();
                    if ($(this).html()== 41) {
                        points.push(1);
                    } else {
                        points.push(-10);
                    }
                })


        }, 2500);
        clearInterval(refreshIntervalId);
    };

    $('#startEasterEggGame2').on('click', function () {
        playGame();
        busOnGo();
    });

    $('.footer_image').on('click', function () {
        iniciateGame();
    });

    $('#closeEasterEgg2').on('click', function () {
        closeGame();
    });
});

//Helper function from AgMo
function RandomValue(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

