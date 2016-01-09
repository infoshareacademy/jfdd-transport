
$(document).ready(function () {
//
//    //var $easterEgg2 = $('#easterEgg2');
    $('#button-gray').on('click', function () {
        startGame();
    });

    var myGamePiece;
    function startGame() {
        myGameArea.start();
        $("#myCanvas").removeClass("hide");
        myGamePiece = new component(30, 30, "red", 10, 120);
    }

    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            document.getElementById('myCanvas');
        }
    }

    function component(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
});

//
//    $('#closeEasterEgg2').on('click', function () {
//        $easterEgg2.addClass('hide');
//    });
//
//    $('#startEasterEggGame2').on('click', function () {
//        playGame();
//    });
//
//    var playGame = function () {
//        $('#easterEgg2Intro').addClass('hide');
//        $('#easterEgg2').addClass('gameBackground');
//        $('#gameScore').removeClass('hide');
//
//    };
//
//
////
//            });





