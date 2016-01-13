// a piece representing player
var myGamePiece;
var myObstacle;

// function startung game, and creating new player
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(10, 200, "green", 300, 120);
}

// Playable canvas
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // set interval on gameArea
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        // clear everything
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function () {
        clearInterval(this.interval);
    }
}

// constructor to create new player
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        //passing canvas here
        ctx = myGameArea.context;
        // setting fill style of draw
        ctx.fillStyle = color;
        //draw sth on canvas
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(img, x, y, 50, 30);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
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
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        myObstacle.x += -1;
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
        myObstacle.update();
    }
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

var img = new Image;
img.src = "images/Untitled.png";