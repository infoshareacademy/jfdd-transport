
$(document).ready(function () {

    var $easterEgg2 = $('#easterEgg2');
    $('#button-gray').on('click', function () {
        $('#easterEgg2').removeClass('hide');
    });

    $('#closeEasterEgg2').on('click', function () {
        $easterEgg2.addClass('hide');
    });


    $('#startEasterEggGame2').on('click', function () {
        playGame();

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }
        var linie = [41, 30, 50, 84, 76, 87, 65, 32];


        b1 = document.createElement('div');
        $(b1).addClass('bus1 buses')
            .html(linie.random())
            .appendTo($("#easterEgg2"))
            .animate({"left":"1500px"}, generateRandomValue(2500, 7000))
            .css('left', function(){ return $(this).offset().left; })
            .click(function () {
                var actualPosition = $(b1).offset().left;
                $(this).remove();
                actualPosition = -220;
                breRun = document.createElement('div');
                $(breRun).addClass('bus1 buses')
                    .html(linie.random())
                    .appendTo($("#easterEgg2"))
                    .css('left', function(){ return $(this).offset().left; })
                    .animate({"left":"1500px"}, generateRandomValue(2500, 7000))


            })



        b2 = document.createElement('div');
        $(b2).addClass('bus2 buses')
            .html(linie.random())
            .appendTo($("#easterEgg2"))
            .animate({"left":"1500px"}, generateRandomValue(2500, 7000))
            .css('left', function(){ return $(this).offset().left; })
            .animate({"left":"1500px"}, generateRandomValue(2500, 7000))
            .click(function () {
                var actualPosition = $(b2).offset().left;
                $(this).remove();
                actualPosition = -220;
                breRun = document.createElement('div');
                $(breRun).addClass('bus2 buses')
                    .html(linie.random())
                    .appendTo($("#easterEgg2"))
                    .css('left', function(){ return $(this).offset().left; })
                    .animate({"left":"1500px"}, generateRandomValue(2500, 7000))

            })
        b3 = document.createElement('div');
        $(b3).addClass('bus3 buses')
            .html(linie.random())
            .appendTo($("#easterEgg2"))
            .animate({"right":"1500px"}, generateRandomValue(2500, 7000))
            .css('right', function(){ return $(this).offset().right; })
            .animate({"right":"1500px"}, generateRandomValue(2500, 7000))
            .click(function () {
                var actualPosition = $(b3).offset().left;
                $(this).remove();
                actualPosition = -220;
                breRun = document.createElement('div');
                $(breRun).addClass('bus3 buses')
                    .html(linie.random())
                    .appendTo($("#easterEgg2"))
                    .css('right', function(){ return $(this).offset().right; })
                    .animate({"right":"1500px"}, generateRandomValue(2500, 7000))
            })
        b4 = document.createElement('div');
        $(b4).addClass('bus4 buses')
            .html(linie.random())
            .appendTo($("#easterEgg2"))
            .css('right', function(){ return $(this).offset().right; })
            .animate({"right":"1500px"}, generateRandomValue(2500, 7000))
            .click(function () {
                var actualPosition = $(b4).offset().left;
                $(this).remove();
                actualPosition = -220;
                breRun = document.createElement('div');
                $(breRun).addClass('bus4 buses')
                    .html(linie.random())
                    .appendTo($("#easterEgg2"))
                    .css('right', function(){ return $(this).offset().right; })
                    .animate({"right":"1500px"}, generateRandomValue(2500, 7000))
            })
    });

    var playGame = function () {
        $('#easterEgg2Intro').addClass('hide');
        $easterEgg2.removeClass('hide');
        $easterEgg2.addClass('gameBackground');
        $('#gameScore').removeClass('hide');
        grass = document.createElement('div');
        $(grass).addClass('grass')
            .appendTo($("#easterEgg2"))


        var sec = 10
        var timer = setInterval(function() {
            $('#gameScore span').text(sec--);
            if (sec == -1) {
                $('#gameScore').fadeOut('fast');
                clearInterval(timer);
            }
        }, 1000);

    }

});


//Helper functions from AgMo
function generateRandomValue(minValToGenerate, maxValToGenerate) {
    return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
}

