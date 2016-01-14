var lines = [41, 47, 14];
var points = [];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};

$(document).ready(function () {

    var iniciateGame = function () {
            $('#easterEgg2').removeClass('hide');
            $('#close').removeClass('hide');
            $('#gameIntro').removeClass('hide');
    };

    var closeGame = function () {
        $('#easterEgg2').addClass('hide');
    };

    var playGame = function () {
        $('.gameBackground').removeClass('hide');
        $('#gameIntro').addClass('hide');
        $('#easterEgg2').removeClass('hide');
        $('#gameScore').removeClass('hide');
        $('#prawaAutorskie a').removeClass('hide');

    var myVar = setInterval(function(){ busOnGo() }, 3000);

    var sec = 20;
    var running = true;
    var timer = setInterval(function() {
        $('#gameScore span').text(sec--);
        if (sec == -1) {
            clearInterval(timer);
            clearInterval(myVar);
            alert(
                    "Koniec gry! \nTwój wynik: " +
                    points.reduce(function(aktualnyWynik,kolejnyPunkt){
                    return aktualnyWynik+kolejnyPunkt;
                    }, 0)
                );
            }
//else if ($('#closeEasterEgg2, #closeEasterEgg22').click){ // not working
//    clearInterval(timer);
//    clearInterval(myVar);
//}
        }, 1000);
    };

    var busOnGo = function(){
            var bus1 = document.createElement('div');
                    $(bus1).addClass('bus1 buses')
                        .html(lines.random())
                        .appendTo($("#easterEgg2"))
                        .animate({"left": "1800px"}, RandomValue(2500, 6500))
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

            bus2 = document.createElement('div');
            $(bus2).addClass('bus2 buses')
                .html(lines.random())
                .appendTo($("#easterEgg2"))
                .css('left', function(){ return $(this).offset().left; })
                .animate({"left":"1800px"}, RandomValue(2500, 6500))
                .click(function () {
                    $(this).remove();
                    if ($(this).html()== 41) {
                        points.push(1);
                    } else {
                        points.push(-10);
                    }
                });

            bus3 = document.createElement('div');
            $(bus3).addClass('bus3 buses')
                .html(lines.random())
                .appendTo($("#easterEgg2"))
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1800px"}, RandomValue(2500, 6500))
                .click(function () {
                    $(this).remove();
                    if ($(this).html()== 41) {
                        points.push(1);
                    } else {
                        points.push(-10);
                    }
                });

            bus4 = document.createElement('div');
            $(bus4).addClass('bus4 buses')
                .html(lines.random())
                .appendTo($("#easterEgg2"))
                .css('right', function(){ return $(this).offset().right; })
                .animate({"right":"1800px"}, RandomValue(2500, 6500))
                .click(function () {
                    $(this).remove();
                    if ($(this).html()== 41) {
                        points.push(1);
                    } else {
                        points.push(-10);
                    }
                })
    };

    $('#startGame').on('click', function () {
        playGame();
    });

    $('.footer_image').on('click', function () {
        iniciateGame();
    });

    $('#close, #close2').on('click', function () {
        closeGame();
    });
});

//Helper function from AgMo
function RandomValue(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

