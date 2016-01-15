

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
};

$(document).ready(function () {

    var lines = [41, 47, 14];
    var points = [];
    var myVar;
    var timer;

    var iniciateGame = function () {
            $('#easterEgg2').removeClass('hidden');
            $('#close').removeClass('hidden');
            $('#gameIntro').removeClass('hidden');

    };

    var closeGame = function () {
        $('#easterEgg2').addClass('hidden');
        $('#okButton').addClass('hidden');
        $('#gameOver').addClass('hidden');
        $('#gameScore').addClass('hidden');


    };

    var playGame = function () {
        $('.gameBackground').removeClass('hidden');
        $('#gameIntro').addClass('hidden');
        $('#easterEgg2').removeClass('hidden');
        $('#gameScore').removeClass('hidden');
        $('#prawaAutorskie a').removeClass('hidden');

        myVar = setInterval(function () {
            busOnGo()
        }, 2600);

        var sec = 20;
        var running = true;
        timer = setInterval(function () {
            $('#gameScore span').text(sec--);
            if (sec == -1) {
                $('#okButton')
                    .removeClass('hidden');
                $('#gameOver')
                    .removeClass('hidden')
                    .find('span')
                    .text(points.reduce(function (aktualnyWynik, kolejnyPunkt) {
                        return aktualnyWynik + kolejnyPunkt;
                    }, 0));
                clearInterval(timer);
                clearInterval(myVar);
            }

            //if (sec < 0) {
            //    $('#gameScore span').addClass('hide');
            //}
        }, 1000);
    };

    var busOnGo = function(){
            var bus1 = document.createElement('div');
                    $(bus1).addClass('bus1 buses')
                        .text(lines.random())
                        .appendTo($("#easterEgg2"))
                        .animate({"left": "1800px"}, RandomValue(2500, 7000))
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
                .animate({"left":"1800px"}, RandomValue(2500, 7000))
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
                .animate({"right":"1800px"}, RandomValue(2500, 7000))
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
                .animate({"right":"1800px"}, RandomValue(2500, 7000))
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

    $('#close, #close2, #okButton').on('click', function () {
        closeGame();
        clearInterval(timer);
        clearInterval(myVar);
    });
});

//Helper function from AgMo
function RandomValue(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

