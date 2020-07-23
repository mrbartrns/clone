const canvas = document.querySelector("canvas");
//call the getContext() method on it to give us a context, drawing area of the canvas and draw 2d shapes on it.
const ctx = canvas.getContext("2d");

//set width and height. > convert to CSS later
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//chaining multiple assignments together, to get the variables all set quicker.
//this function takes two arguments and returns random number in the range between two
function random(min, max) {
    const num = Math.floor(Math.random()*(max - min + 1)) + min;
    return num
}

/*Since these balls will all behave in the same way, it makes sense to represent them with an object.
 - x, y: horizontal and vertical coordinates where the ball starts on the screen (0~ width), (0~height)
 - velX, velY: velocity of horizontal and vertical velocity. in real terms these values are regularly added to the x/y
            coordinate values when we animate the balls, to move them by this much on each frame.
 -color: each ball gets color.
 -size: each ball gets a size - this is its radius, in pixels.
 -*/
 //drawing the ball
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//This is prototype methods.
/* */
Ball.prototype.draw = function() {
    //새로운 경로를 만든다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용된다.
    //경로를 만들기 위한 첫번째 단계
    ctx.beginPath();
    //define what color we want the shape to be
    ctx.fillStyle = this.color;
    //trace an arc shape on the paper
    //x, y position of the arc's center
    //radius = size
    //2 * PI is complete circle
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //경로의 내부를 채워서 내부가 채워진 도형을 그린다.
    ctx.fill();
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

//updating the ball's data
Ball.prototype.update = function() {
    // if x coordinate is greater than the width of the canvas, move to other side
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    // if y coordinate is greater than the height of the canvas, move to other side
    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    //the ball is in effect moved each time this method is called(x좌표, y좌표에 move 값을 더함.)
    this.x += this.velX;
    this.y += this.velY;
}
/*need to check every other ball to see if it has collided with the current ball
check whether the current ball being looped through is the same ball as the one we are currently checking.
 */
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if(!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
            }        
        }   
    }
}

//animating the ball
//create somewhere to store all the balls then populate
let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
        size
    )
    balls.push(ball);
}

function loop(){
    //sets the canvas fill color to semi-transparent black
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    //draws a rectangle of the color across the whole width and height of the canvas
    ctx.fillRect(0, 0, width, height);

    balls.forEach(ball => {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    });

    //All programs that animate things generally involve an animation loop, which serves to update the information in the program and then render the result
    requestAnimationFrame(loop);

}

loop();

//add some collision detection, so balls know when they have hit another ball
