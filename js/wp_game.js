var myGamePiece;
var myObstacles = [];
var obcBuilding;
var myBackground;
var gameOver;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(145, 50, "images/wp-game/bus.svg", 10, 105, "image");
    obcBuilding = new component(186 * 2, 276 * 2, "images/wp-game/building.svg", 500, -276, "image");
    myBackground = new component(456, 270, "images/wp-game/threelane.svg", 0, 0, "background");
    gameOver = new component(400, 270, "images/wp-game/game-over.png", 5, 0, "image");
    var snd = new Audio("wp-game/pacman_dies_y.wav"); // buffers automatically when created
    snd.play();

    for (var i = 0; i < 7; i++) {
        var yCoordinatesForLanes = [45, 110, 180];
        var otherVehicleTextures = ["car1.svg", "car2.svg", "car3.svg"];
        setTimeout(function () {
            var randomLaneYCoordinate = yCoordinatesForLanes[Math.floor(Math.random() * yCoordinatesForLanes.length)];
            var randomVehicleFileName = otherVehicleTextures[Math.floor(Math.random() * otherVehicleTextures.length)];
            myObstacles.push(new component(60, 33, "images/wp-game/" + randomVehicleFileName, 500, randomLaneYCoordinate, "obstacle"));
        }, i * 2500);


    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 270;
        this.canvas.setAttribute("id", "wp-canvas");
        this.context = this.canvas.getContext("2d");
        alert("Znalazłeś ukrytą grę. Dojedź do infoShare Academy, sterując klawiszami: W, S, A, D. Omijaj inne pojazdy!");
        $('.testersParagraph').prepend(this.canvas);
        $('.testersParagraph').prepend()
        this.interval = setInterval(updateGameArea, 10);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function () {
        clearInterval(this.interval);
    }
};

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background" || type == "obstacle") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image" || type == "background" || type == "obstacle") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image,
                    this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    };
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
    this.arriveAtDestination = function (otherobj) {
        var myleft = this.x;
        var otherleft = otherobj.x;
        var arrive = true;
        if (myleft < otherleft) {
            arrive = false;
        }
        return arrive;
    };
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.speedX = -2;
    myBackground.newPos();
    myBackground.update();


    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }


    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 65) {
        myGamePiece.speedX = -1;
    }
    if (myGameArea.key && myGameArea.key == 68) {
        myGamePiece.speedX = 1;
    }
    if (myGameArea.key && myGameArea.key == 87) {
        myGamePiece.speedY = -1;
    }
    if (myGameArea.key && myGameArea.key == 83) {
        myGamePiece.speedY = 1;
    }
    myGamePiece.newPos();
    myGamePiece.update();
    for (i = 0; i < myObstacles.length; i++) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            gameOver.update();
        }
    }

    if (myObstacles[myObstacles.length - 1].x < 0) {
        obcBuilding.speedX = -2;
        obcBuilding.newPos();
        obcBuilding.update();
        if (myGamePiece.arriveAtDestination(obcBuilding)) {
            myGameArea.stop();
        }
    }

}

