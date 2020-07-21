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
let pcNumber = 0;
let history = [];

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

// save the value and valuecheck function, paintfunction
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = gameInput.value;
    gameInput.value = ""
    paintValue(currentValue);
    //valueCheck(currentValue);
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