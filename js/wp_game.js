var myGamePiece;
var myObstacle;
//var myScore;
var myBackground;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(100, 50, "images/Untitled.png", 10, 120, "image");
    //myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myObstacle = new component(100, 50, "images/Untitled.png", 50, 200 , "obstacle");
    myBackground = new component(456, 270, "images/threelane.png", 0, 0, "background");
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        myBackground.speedX = -2;
        myBackground.newPos();
        myBackground.update();
        myObstacle.speedX = -1;
        myObstacle.newPos();
        myObstacle.update();
        //myObstacle.x += -1;


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

function triggerFunctionAtRandom(min, max, f) {

    setInterval(doSomething(), randomInterval(50,3000));
}

function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doSomething() {
    alert();
}