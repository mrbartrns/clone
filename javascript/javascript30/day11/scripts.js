const videoSrc = document.querySelector("video");
const btns = document.querySelectorAll(".player__button");
const toggle = document.querySelector(".toggle");
const ranges = document.querySelectorAll('input[type="range"]');
const progress = document.querySelector('.progress');

async function playVideo() {
    try {
        await videoSrc.play();
        toggle.textContent = '❚ ❚';
    }
    catch(e) {
        console.log(e);
    }
}

async function pauseVideo() {
    try {
        await videoSrc.pause();
        toggle.textContent = '►';
    }
    catch (e) {
        console.log(e);
    }
}

function handleInput() {
    const value = this.value;
    if (this.name === 'volume') {
        videoSrc.volume = value;
    } else {
        // playbackRate
        videoSrc.playbackRate = value;
    }
}

function handleClick() {
    if(this.title === 'Toggle Play') return;
    const time = Number(this.dataset.skip);
    if (videoSrc.currentTime >= 0 && videoSrc.currentTime <= videoSrc.duration) {
        videoSrc.currentTime += time;
        showProgress();
    }
    console.dir(videoSrc);
}

function showProgress() {
    const suffix = '%';
    const percentage = (videoSrc.currentTime / videoSrc.duration) * 100
    document.documentElement.style.setProperty(`--percentage`, String(percentage) + suffix);
}

function showCurrentLocation(e) {
    // e.offsetX / total length * duragion = currentTime
    console.log(e.offsetX, progress.clientWidth);
    videoSrc.currentTime = (e.offsetX / progress.clientWidth) * videoSrc.duration;
    showProgress();
}

setInterval(showProgress, 1000);
videoSrc.addEventListener("click", () => {
    return videoSrc.paused ? playVideo() : pauseVideo();
});
toggle.addEventListener("click", () => {
    return videoSrc.paused ? playVideo() : pauseVideo();
});
btns.forEach(btn => btn.addEventListener('click', handleClick));
ranges.forEach(range => range.addEventListener('input', handleInput));
progress.addEventListener("click", showCurrentLocation);


// have to make documentElement played: percentage;
// if click progress, progress__filled will be there and current time have to be changed
// percentage => 100 * (currentTime / duration)