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
    this.paddel.style.left = "271px";

    this.container = document.getElementById('container');
    this.container.width = "800";
    this.container.height = "500";
    this.container.appendChild(this.element);
    this.container.appendChild(this.audio);
    this.container.appendChild(this.paddel);

    this.width = function () {
        return parseInt(this.element.width);
    };

    this.height = function () {
        return parseInt(this.element.height);
    };

    this.left = function () {
        return parseInt(this.element.style.left);
    };

    this.leftPaddel = function () {
        return parseInt(this.paddel.style.left);
    };

    this.top = function () {
        return parseInt(this.element.style.top);
    };

    this.center = {'x' : (this.width() / 2) + this.left(),
                   'y' : (this.height() / 2) + this.top() };

    this.paddleCenter = {'x' : (this.width() / 2) + this.left(),
                         'y' : (this.height() / 2) + this.top() };

    this.directionX = 1;
    this.directionY = 1;
    this.changeDirection = -1;

    this.draw = function (magnitude) {
        var currentLeft = this.left();
        var currentTop = this.top();
        var paddleLeft = this.leftPaddel();

        if (isNaN(currentLeft)) { currentLeft = 0}
        if (isNaN(paddleLeft)) { paddleLeft = 271}
        if (isNaN(currentTop)) { currentTop = 0}

        var vectorX = currentLeft + (magnitude * this.directionX);
        var vectorY = currentTop + (magnitude * this.directionY);

        var vector = magnitude + this.directionX;

        this.center.x = vectorX + (this.width() / 2);
        this.center.y = vectorY + (this.height() / 2);
        this.element.style.left = vectorX + 'px';
        this.element.style.top = vectorY + 'px';

        this.collisionDetect();
        this.paddelMove();
    };

    this.collisionDetect = function () {
        var containerWidth = parseInt(this.container.width);
        var containerHeight = parseInt(this.container.height);


        var halfWidth = (this.width() / 2);

        if ((this.directionX * this.directionY) + this.changeDirection == 0) {
            this.changeDirection = this.changeDirection * -1;
            this.audio.play();
        }

        if (this.center.x + halfWidth >= containerWidth || this.center.x - halfWidth < 0) {
            this.directionX = this.directionX * -1;
        }

        if (this.center.y + halfWidth >= containerHeight || this.center.y - halfWidth < 0) {
            this.directionY = this.directionY * -1;
        }
    },

    this.paddelMove = function () {
        if (ANIMATION.keyDownPass == 37) {console.log(ANIMATION.keyDownPass);}
        if (ANIMATION.keyDownPass == 39) {console.log(ANIMATION.keyDownPass);}
//        console.log(ANIMATION.keyUpPass);
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
    ANIMATION.keyDownPass = (event.which)
};

ANIMATION.keyUp = function (event) {
    ANIMATION.keyUpPass = (event)
};

ANIMATION.start = function () {
  ANIMATION.ball = new ball();
  ANIMATION.startTime = ANIMATION.currentTime();
  ANIMATION.timer = setInterval(ANIMATION.draw, ANIMATION.timerInterval);
};
