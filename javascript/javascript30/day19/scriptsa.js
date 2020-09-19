const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
            console.log(stream);
            video.srcObject = stream;
            // video.src = window.URL.createObjectURL(stream);
            video.play();
        })
        .catch(err => {
            console.err('OH, NO!', err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // filter
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="handsome man"/>`
    strip.insertBefore(link, strip);

}


function redEffect(pixels) {
    for(let i =0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // r
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // g
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i =0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] + 100; // r
        pixels.data[i + 500] = pixels.data[i + 1] - 50; // g
        pixels.data[i - 550] = pixels.data[i + 2] * 0.5; // b
    }
    return pixels;
}
getVideo();
video.addEventListener('canplay', paintToCanvas);