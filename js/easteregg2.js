
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


        var counter = 10;
        var newCounter = document.createElement("div");
        newCounter.innerHTML = "Time left: 10 seconds.";
        $(newCounter).addClass('counter');
        var id;

        id = setInterval(function() {
            counter--;
            if(counter < 0) {
                clearInterval(id);
            } else {
                newCounter.innerHTML = "Time left: " + counter.toString() + " seconds.";
            }
        }, 1000);
    });

    var playGame = function () {
        $('#easterEgg2Intro').addClass('hide');
        $easterEgg2.removeClass('hide');
        $easterEgg2.addClass('gameBackground');
        $('#gameScore').removeClass('hide');
        grass = document.createElement('div');
        $(grass).addClass('grass')
            .appendTo($("#easterEgg2"))

    //    var myCounter = new Countdown({
    //        seconds:5,  // number of seconds to count down
    //        onUpdateStatus: function(sec){$(grass).append(sec);},
    //        onCounterEnd: function(){ alert('End of a game!');}
    //
    //
    //    });
    //
    //    myCounter.start();
    //
    //    function Countdown(options) {
    //        var timer,
    //            instance = this,
    //            seconds = options.seconds || 10,
    //            updateStatus = options.onUpdateStatus || function () {},
    //            counterEnd = options.onCounterEnd || function () {};
    //
    //        function decrementCounter() {
    //            updateStatus(seconds);
    //            if (seconds === 0) {
    //                counterEnd();
    //                instance.stop();
    //            }
    //            seconds--;
    //        }
    //
    //        this.start = function () {
    //            clearInterval(timer);
    //            timer = 0;
    //            seconds = options.seconds;
    //            timer = setInterval(decrementCounter, 1000);
    //        };
    //
    //        this.stop = function () {
    //            clearInterval(timer);
    //        };
    //    }

    //
    };

    //var downloadButton = document.getElementById("download");
    //var counter = 10;
    //var newElement = document.createElement("div");
    //newElement.innerHTML = "Time left: 10 seconds.";
    //$(newElement).addClass('counter');
    //var id;
    //
    //downloadButton.parentNode.replaceChild(newElement, downloadButton);

    //id = setInterval(function() {
    //    counter--;
    //    if(counter < 0) {
    //        newElement.parentNode.replaceChild(downloadButton, newElement);
            //clearInterval(id);
        //} else {
        //    newElement.innerHTML = "Time left: " + counter.toString() + " seconds.";
        //}
    //}, 1000);

    //function countdown(seconds) {
    //    var miliseconds = 1000;
    //    var secs = seconds;
    //    function tick() {
    //        var counter = document.getElementById("counter");
    //        var current_seconds = secs-1;
    //        miliseconds--;
    //        counter.innerHTML = current_seconds.toString();
    //        if( miliseconds > 0 ) {
    //            setTimeout(tick, 1000);
    //
    //        } else {
    //            if(seconds > 1){
    //                countdown(secs-1);
    //            }
    //            else {if(seconds=0)
    //                alert("Hello");}
            //}
        //
        //}
        //tick();
    //}
    //
    //countdown(5);
//
});


//Helper functions from AgMo
function generateRandomValue(minValToGenerate, maxValToGenerate) {
    return Math.floor((Math.random() * (maxValToGenerate - minValToGenerate + 1)) + minValToGenerate);
}

