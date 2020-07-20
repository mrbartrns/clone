/*FIRST THINGS FIRST
1. Write comments what I need to make function
2. Write an approximate step to make algorithm more easily */

// step 1: make an object of greeting division
const form = document.querySelector(".greeting-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".greetings")
const USER_LS = "username";
const SHOW = "showing";

//localStorage.setItem doesn't need a const name
function saveUserName(currentValue) {
    localStorage.setItem(USER_LS, currentValue);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveUserName(currentValue);
}

function askForName(){
    form.classList.add(SHOW);
    //eventlistner should be setted on form
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(currentUser){
    
    greetings.classList.add(SHOW);
    form.classList.remove(SHOW);
    greetings.innerText = `Hello, ${currentUser}!`;
}

function loadUserName(){
    const currentUser = localStorage.getItem(USER_LS)
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

// step 2: write a function 'init'
function init(){
    loadUserName();
}

init();