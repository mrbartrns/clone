/*
1. always start with function init()
2. make function name in verb, it helps me to think how to make function
3. think how to set attribute
*/
// make initial object to deal with the problem
/* Now, What I have to do is that to get time 
and make it change text in seconds*/
const clockContainer = document.querySelector(".js-clock");
const jsClock = clockContainer.querySelector("h1");

function writeTime(){
    //innertext not using () while =
    jsClock.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getTime(){
    //First, we have to make Date object to make a clock
    const date = new Date();
    //seconds, we have to make hour, time, seconds
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    writeTime();

}

function init(){
    //getTime func is to create new
    getTime();
    //uptdate 1000 milisecods
    setInterval(getTime, 1000);
}

init();