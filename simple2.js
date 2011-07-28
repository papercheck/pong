function ball() {

    this.element = document.createElement('div');
    this.element.id = "ball";
    this.element.width = "20";
    this.element.height = "20";
    this.element.style.left = "10px";
    this.element.style.top = "10px";

    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', 'pong.mp3');

    this.paddel = document.createElement('div');
    this.paddel.id = "paddel";
    this.paddel.width = "180";
    this.paddel.height = "20";
    this.paddel.style.left = "300px";
    this.paddel.style.top = "480px";

    this.brick = document.createElement('div');
    this.brick.className = "brick";
    this.brick.width = "50";
    this.brick.height = "20";
    this.brick.style.left = "300px";

    this.container = document.getElementById('container');
    this.container.width = "800";
    this.container.height = "500";
    this.container.appendChild(this.element);
    this.container.appendChild(this.audio);
    this.container.appendChild(this.paddel);
    this.container.appendChild(this.brick);

    this.width = function () {
        return parseInt(this.element.width);
    };

    this.height = function () {
        return parseInt(this.element.height);
    };

    this.left = function () {
        return parseInt(this.element.style.left);
    };

    this.paddelWidth = function () {
        return parseInt(this.paddel.width);
    };

    this.paddelHeight = function () {
        return parseInt(this.paddel.height);
    };

    this.leftPaddel = function () {
        return parseInt(this.paddel.style.left);
    };

    this.top = function () {
        return parseInt(this.element.style.top);
    };

    this.brickHeight = function (){
        return parseInt(this.brick.style.top)
    };

    this.brickLeft = function (){
        return parseInt(this.brick.style.left)
    };

    this.brickWidth = function (){
        return parseInt(this.brick.style.width)
    };

    this.center = {'x' : (this.width() / 2) + this.left(),
                   'y' : (this.height() / 2) + this.top() };

    this.paddelCenter = {'x' : (this.paddelWidth) + this.leftPaddel,
                         'y' : (this.paddelHeight)};

    this.brickCenter = {'x' : (this.brickWidth()) + this.brickLeft,
                        'y' : (this.brickHeight())};

    this.directionX = 1;
    this.directionY = 1;
    this.paddelRight = -1;
    this.paddelLeft = 1;
    this.changeDirection = -1;

    this.draw = function (magnitude) {
        var currentLeft = this.left();
        var currentTop = this.top();
        var paddelLeft = this.leftPaddel();

        if (isNaN(currentLeft)) { currentLeft = 0}
        if (isNaN(paddelLeft)) { paddelLeft = 300}
        if (isNaN(currentTop)) { currentTop = 0}

        var vectorX = currentLeft + (magnitude * this.directionX);
        var vectorY = currentTop + (magnitude * this.directionY);
        var vectorXP = paddelLeft + this.paddelLeft + this.paddelRight;

        this.center.x = vectorX + (this.width() / 2);
        this.center.y = vectorY + (this.height() / 2);
        this.paddelCenter.x = vectorXP + 1;
        this.paddelCenter.y = this.paddelHeight();
        this.element.style.left = vectorX + 'px';
        this.element.style.top = vectorY + 'px';
        this.paddel.style.left = vectorXP + 'px';

        this.collisionDetect();
        this.paddelMove();
    };

    this.collisionDetect = function () {
        var containerWidth = parseInt(this.container.width);
        var realXcenter = this.center.x * -1 + containerWidth;
        var containerWidthP = parseInt(this.container.width);
        var containerHeight = parseInt(this.container.height);
        var halfWidth = (this.width() / 2);
        var paddelWidth = (this.paddelWidth());
        var brickWidth = (this.brickWidth());
        var brickHeight = (this.brickHeight());

        //ping audio
        if ((this.directionX * this.directionY) + this.changeDirection == 0) {
            this.changeDirection = this.changeDirection * -1;
            this.audio.play();
        }

        //bounce x-axis
        if (this.center.x + halfWidth >= containerWidth || this.center.x - halfWidth < 0) {
            this.directionX = this.directionX * -1;
        }

        //bounce y-axis from the ceiling
        if (this.center.y - halfWidth < 0) {
            this.directionY = this.directionY * -1;
        }

        //bounce y-axis the floor, which is a fail
        if (this.center.y + halfWidth >= containerHeight) {
            this.directionX = 0;
            this.directionY = 0;
        }

        //bounce off the paddel
        if(containerHeight - this.center.y - halfWidth == this.paddelCenter.y && realXcenter + paddelWidth <= paddelWidth + this.paddelCenter.x) {
            this.directionY = this.directionY * -1;
            console.log("side 1: "+(realXcenter));
            console.log("side 2: "+(this.paddelCenter.x));
        }
//        else {
//            console.log("side 1: "+(this.center.x));
//            console.log("side 2: "+(this.paddelCenter.x));
//        }

//        //bounce off the bricks
//        if(containerHeight - brickHeight - this.center.y - halfWidth == this.brickCenter.y && this.center.x + brickWidth >= brickWidth + this.brickCenter.x) {
//            console.log("off bricks");
//        }

        //contains the paddel inside the container
        if (this.paddelCenter.x + paddelWidth + 1 >= containerWidthP || this.paddelCenter.x - 1 < 0) {
            this.paddelRight = 0;
            this.paddelLeft = 0;
        }
    },

    this.paddelMove = function () {
         if (this.paddelRight == 0) {
            this.paddelRight = -1;
            this.paddelLeft = 1;
         }

        if (ANIMATION.keyDownPass == 39 && ANIMATION.keyUpPass != 39) {
            if (this.paddelLeft == -1) {
                this.paddelLeft = 1;
            }

            this.paddelRight *= -1;

            ANIMATION.keyDown.stopProp();
            if (ANIMATION.keyUpPass != null) {ANIMATION.keyUp.stopProp();}
        }

        if (ANIMATION.keyDownPass == 37 && ANIMATION.keyUpPass != 37) {
            if (this.paddelRight == 1) {
                this.paddelRight = -1;
            }

            this.paddelLeft *= -1;

            ANIMATION.keyDown.stopProp();
            if (ANIMATION.keyUpPass != null) {ANIMATION.keyUp.stopProp();}
        }

    }
}


ANIMATION = {};

ANIMATION.ball = null;
ANIMATION.startTime = null;
ANIMATION.timer = null;
ANIMATION.timerInterval = 1000 / 800;
ANIMATION.magnitude = 1;
ANIMATION.keyDownPass = null;
ANIMATION.keyUpPass = null;

ANIMATION.currentTime = function () {
  return (new Date).getTime();
};

ANIMATION.draw = function () {
   ANIMATION.ball.draw(ANIMATION.magnitude);
};

ANIMATION.keyDown = function (event) {
    ANIMATION.keyDownPass = (event.which);
    ANIMATION.keyDown.stopProp = function () {
        ANIMATION.keyDownPass = null;
    }
};

ANIMATION.keyUp = function (event) {
    ANIMATION.keyUpPass = (event.which);
    ANIMATION.keyUp.stopProp = function () {
        ANIMATION.keyUpPass = null;
    }
};

ANIMATION.start = function () {
  ANIMATION.ball = new ball();
  ANIMATION.startTime = ANIMATION.currentTime();
  ANIMATION.timer = setInterval(ANIMATION.draw, ANIMATION.timerInterval);
};
