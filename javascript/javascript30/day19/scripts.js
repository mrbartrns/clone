 
canvas.width = 640, canvas.height = 480;
const constraints = {audio: false, video: true};
let crop;
let raf;


navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;
        // video.onloadedmetadata = (e) => {
        //     video.play();
        // }
        video.onplaying = () => {
            const croppedWidth = (Math.min(video.videoHeight, canvas.height) / Math.max(video.videoHeight, canvas.height) * Math.min(video.videoHeight, canvas.height)),
            croppedX = (video.videoWidth - croppedWidth) / 2;
            crop = {
                w: croppedWidth,
                h: video.videoHeight,
                x: croppedX,
                y: 0
            };
            raf = requestAnimationFrame(loop);
        }
        video.onpause = () => {
            cancelAnimationFrame(loop);
        }
        video.play();
    })
    .catch(e => console.log(e));

function takePhoto() {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    const newA = document.createElement('a');
    const newImg = document.createElement('img');
    newA.setAttribute('href', dataURL);
    newA.setAttribute('download', 'handsome');
    newImg.src = dataURL;
    newA.appendChild(newImg);
    strip.appendChild(newA);
    snap.play();
    snap.currentTime = 0;
}

function loop() {
    ctx.drawImage(video, 0, 0, 640, 480, 0, 0, canvas.width, canvas.height);
    raf = requestAnimationFrame(loop);
}
