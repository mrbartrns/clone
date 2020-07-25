const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let rightPressed = false;
let leftPressed = false;

let x = width / 2;
let y = height - 30;
let dx = 2;
let dy = -2;
let radius = 10;
let color = `rgba(0, 0, 255, 0.25)`;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (width - paddleWidth) / 2;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (let r=0; r<brickRowCount; r++) {
        //status는 벽돌을 그릴지 말지 선택하는 것
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
console.log(bricks);

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();    
}

function drawBricks() {
    for (let c=0; c<brickColumnCount; c++) {
        for (let r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "0095DD";
                ctx.fill();
                ctx.closePath();
            }
       }
    }
}
//충돌 판정
function collisionDetection() {
    for (let c=0; c<brickColumnCount; c++) {
        for (let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}
function keyDownHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = true;
    } else if (event.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
        leftPressed = false;
    }
}

function draw() {
    //clear previous frame
    ctx.clearRect(0, 0, width, height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    x += dx;
    y += dy;
    if ((x + radius) >= width || (x - radius) <= 0) {
        dx = -dx;
        color = `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.25)`;
    }
    if ((y + dy) <= radius) {
        dy = -dy;
        color = `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.25)`;
    } else if ((y + dy) > height - radius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            // 패들에 닿았을 때 속도 증가 dx *= 2;
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if (rightPressed && paddleX < width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);