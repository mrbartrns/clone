/*divide and conquer 기법 사용
문서에서 키를 누를 때 인식하고, 키를 뗄 때 인식 해야 한다.
키를 눌렀을 때, 각 div의 소스들을 실행한다.
키를 떼면, 더이상 소리를 내지 않고, playing이라는 클래스를 다시 지워야 한다.
addeventListener transitioned ??*/
const soundContainer = document.querySelector(".keys");
const soundBox = soundContainer.querySelectorAll(".key");
const audioList = document.querySelectorAll("audio");
const PLAYING = "playing";

/*
function handleTransitioned(event) {
    const key = event.keyCode;
    const stringKey = key.toString();
    soundBox.forEach(element => {
        if (element.dataset.key === stringKey) {
            element.play();
        }
    })
}
*/

function pauseSound(element) {
    element.pause();
}

function playSound(element) {
    element.play();
}

function keyUpHandler(event) {
    const key = event.keyCode;
    const stringKey = key.toString();
    soundBox.forEach(element => {
        if (element.dataset.key === stringKey) {
            element.classList.remove(PLAYING);
        }
    });
    audioList.forEach(element => {
        if (element.dataset.key === stringKey) {
            paseSound(element);
        }
    });

}
function paintPlaying(element) {
    element.classList.add(PLAYING);
}

function keyDownHandler(event) {
    const key = event.keyCode;
    const stringKey = key.toString();
    console.log(stringKey);
    soundBox.forEach(element => {
        if (element.dataset.key === stringKey) {
            paintPlaying(element);
        }
    });
    audioList.forEach(element => {
        if(element.dataset.key === stringKey) {
            playSound(element);
        }
    });
    
}

function main() {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    //document.addEventListener("transitionend", handleTransitioned);
    
}

main();