const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

/* 클릭 시 직사각형을 움직이게 하는 것을 구현하고 싶다.
1. 먼저 직사각형을 하나 그린다. 직사각형의 속성을 먼저 만든다.
2. 클릭시 실행할 함수를 만든다. addEventListner?(update?) */
//draw 함수와 update 함수는 세트로 다녀야 함.
//x, y는 시작점, w, h는 사각형의 가로길이와 세로길이를 나타냄.
//배경이 흰색이라면 어떻게 될까? > 궤적이 남아있게된다
let x = 100;
let y = 100;
let size = 30;
let velX = 20;
let velY = 10;

function draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 200, 0, 0.25)`;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function update() {
    if ((x + size) >= width) {
        velX = -velX;
    }
    if ((x - size) <= 0) {
        velX = -velX;
    }
    if ((y + size) >= height) {
        velY = -velY;
    }
    if ((y - size) <= 0) {
        velY = -velY;
    }
    x += velX;
    y += velY;
}

function loop() {
    ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
    ctx.fillRect(0, 0, width, height);
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();