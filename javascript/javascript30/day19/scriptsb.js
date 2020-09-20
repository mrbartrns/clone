const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// 미디어 다룰 시, 항상 미디어 console.log 및 관련 이벤트 찾아볼 것
// web camera로부터 정보를 받는다.
navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => console.log(err));

// canvas로 웹캠으로 부터 받은 정보를 이동시킨다.
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // closuere 구조. 16 miliseconds마다 비디오로부터 받은 이미지 정보를 표시한다.
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] // red 150픽셀 왼쪽으로 쉬프트
        pixels.data[i + 550] = pixels.data[i + 1] // green 550픽셀 오른쪽으로 쉬프트
        pixels.data[i - 150] = pixels.data[i + 2] // blue 150픽셀 왼쪽으로 쉬프트
    }
    return pixels
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${dataURL}" alt="handsome"/>`
    strip.insertBefore(link, strip.firstChild);
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = Number(input.value); //초기값
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i + 0]; // red 150픽셀 왼쪽으로 쉬프트
        green = pixels.data[i + 1]; // green 550픽셀 오른쪽으로 쉬프트
        blue = pixels.data[i + 2]; // blue 150픽셀 왼쪽으로 쉬프트
        alpha = pixels.data[i + 3];
        
        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
            }
    }
    return pixels;
}


video.addEventListener('canplay', paintToCanvas);