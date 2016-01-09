
$(document).ready(function () {
//
////    //var $easterEgg2 = $('#easterEgg2');
//    $('#button-gray').on('click',
// function () {
        startGame();
    });

    var firstBus, secondBus, thirdBus, forthBus;
    function startGame() {
        $("#myCanvas").removeClass("hide");
        myGameArea.start();
        firstBus = new component1(100, 50, "black", 1, 20);
        secondBus = new component2(100, 50, "black", 1, 120);
        thirdBus = new component3(100, 50, "black", 900, 230);
        forthBus = new component4(100, 50, "black", 900, 330);
    }

    var myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 1000;
            this.canvas.height = 400;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[6]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);
        },
        stop : function() {
            clearInterval(this.interval);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function component1(width, height, color, x, y) {
        //this.type = type;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.speed = 1;
        this.x = x;
        this.y = y;
        this.update = function() {
            ctx = myGameArea.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            ctx.restore();
        }
        this.newPos = function() {
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
        }
    }

function component2(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function component3(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function component4(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function updateGameArea() {
    myGameArea.clear();
    //firstBus.x += 1;
    //secondBus.x +=2;
    //thirdBus.x -=1;
    //forthBus.x -=2;
    //firstBus.newPos();
    //secondBus.newPos();
    //thirdBus.newPos();
    //forthBus.newPos();
    firstBus.update();
    secondBus.update();
    thirdBus.update();
    forthBus.update();
}
//});

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





