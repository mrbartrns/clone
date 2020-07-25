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
    drawBall();
    drawPaddle();
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