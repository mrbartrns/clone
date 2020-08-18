/*숫자 맞추기 게임 만들기
1. 1과 100사이의 수 중에서 무작위로 선택되어야 함 -
2. 플레이어는 10번의 기회 안에 그 숫자를 맞춰야 함
3. 각 순서마다 숫자를 맞췄는지 틀렸는지 알려줘야 함
4. 틀렸다면 큰지, 작은지 포함해서 알려줘야 함
5. 게임은 플레이어가 맞추던지, 기회를 모두 소진하게 되면 끝나게 됨
6. 게임이 끝나면 플레이어가 다시 게임을 할 것인지 묻는다.*/
const gameForm = document.querySelector(".game");
const gameInput = gameForm.querySelector("input");
const ul = document.querySelector(".history");
const div = document.querySelector(".game-divsion");
const gameResult = document.querySelector(".game-result");
const resultSpan = gameResult.querySelector(".result");
const gameCount = document.querySelector(".game-count");
const countSpan = gameCount.querySelector(".count");
let pcNumber = 0;
let tryCount = 0;
let history = [];

function deleteChild() {
    let li = ul.firstElementChild;
    while (li) {
        ul.removeChild(li);
        li = ul.firstElementChild;
        //or use ul.innerHTML = ""
    }
}

//make reset function complete
function reset(event) {
    const btn = event.target;
    const resultDiv = btn.parentNode;
    resultDiv.removeChild(btn);
    pcNumber = 0;
    tryCount = 0;
    history = [];
    pcNumber = createRandomNumber();
    console.log(pcNumber);
    gameForm.classList.remove("hidden");
    gameCount.classList.add("hidden");
    gameResult.classList.add("hidden");
    deleteChild();
}
function askGameAgain() {
    setTimeout(() => {
        resultSpan.innerHTML = "다시 하시겠습니까?"
        const btn = document.createElement("button")
        gameResult.appendChild(btn);
        btn.innerText = "다시 하기"
        btn.addEventListener("click", reset)
    }, 2000);

}

function countCheck(count, checkValue) {
    if (count === 10 && checkValue !== 0) {
        resultSpan.innerHTML = "게임 오버!"
        askGameAgain();
    }
}

//plusCount function get value tryCount and transit to countCheck function
function plusCount() {
    tryCount++;
    
}

function paintCount() {
    if (tryCount < 10) {
        countSpan.innerHTML = `시도 횟수: ${tryCount + 1}회<br>`;
    }
}

/* numbercount function needed */
function paintResult(userNumber) {
    const numCheckValue = checkUserNumber(userNumber);

    // write count on the result
    paintCount();
    if (numCheckValue === 0) {
        //write text in the value
        resultSpan.innerHTML = "정답입니다!<br>";
        gameForm.classList.add("hidden");
        console.log("correct");
        askGameAgain();
    } else if (numCheckValue === 1) {
        resultSpan.innerHTML = "틀렸습니다. 숫자를 더 낮게 추측하세요.<br>";
    } else if (numCheckValue === 2) {   
        resultSpan.innerHTML = "틀렸습니다. 숫자를 더 높게 추측하세요.<br>";
    }
    plusCount();
    countCheck(tryCount, numCheckValue);
}

// check the usernumber is same with pcNumber or not
function checkUserNumber(userNumber) {
    if (userNumber === pcNumber) {
        return 0;
    } else {
        if (userNumber > pcNumber) {
            return 1;
        } else {
            return 2;
        }
    }
}

function deleteValue(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const id = li.id;
    ul.removeChild(li);
    
    const newHistory = history.filter(element => {
        return element.id !== parseInt(id);
    });
    history = newHistory;
    //initialize id in object
    history.forEach(element => {
        let i = history.indexOf(element) + 1;
        element.id = i;
    })
    //initialize id in html
    //querySelector List CANNOT use the forEach function.
    const liAll = document.querySelectorAll("li");
    for (let i=0; i<liAll.length; i++){
        liAll[i].id = i + 1;
        console.log(liAll[i]);
    }
    console.log(liAll);
    console.log(history);
}
function paintError() {
    resultSpan.innerHTML = `숫자가 아니거나 1~100 사이의 숫자가 아닙니다. 다시 입력하세요.<br>`;
}

// make history in the html, 
function paintValue(userNumber) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const id = history.length + 1;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = id;
    ul.appendChild(li);
    span.innerText = userNumber;
    delBtn.innerText = "delete";
    delBtn.addEventListener("click", deleteValue);

    const userNumberObj = {
        number: userNumber,
        id: id
    }
    history.push(userNumberObj);

}

function inputValueCheck(input) {
    if (typeof(input) === "number") {
        return input <= 100 && input >= 1;
    } else {
        return false;
    }
}

// save the value and valuecheck function, paintfunction
function handleSubmit(event) {
    event.preventDefault();
    gameResult.classList.remove("hidden");
    gameCount.classList.remove("hidden");
    const currentValue = parseInt(gameInput.value);
    gameInput.value = ""
    //value check if currentValue is the number or string
    const inputCheck = inputValueCheck(currentValue);
    if (inputCheck) {
        paintValue(currentValue);
        paintResult(currentValue);
    } else {
        paintError();
    }
    
}

function createRandomNumber() {
    //make randomnumber 1~100
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
}

function init() {
    pcNumber = createRandomNumber();
    console.log(pcNumber);
    gameForm.addEventListener("submit", handleSubmit);

}

init();
//test