const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
//BUTTON IN THE FORM ACTS LIKE "SUBMIT", BE CAREFUL
const toDoList = document.querySelector(".todo-list");
const TODO_LS = "todos";
let toDos = [];


function deleteToDo(event){
    //use console.dir to find attribute btn.parentnode
    const btn = event.target;
    const list = btn.parentNode;
    console.log(list);
    toDoList.removeChild(list);
    //filter function only return if element is true => return array with element
    const cleanToDos = toDos.filter(function(todo){
        return todo.id !== parseInt(list.id);
    })
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}
    /*
    const list = btn.parentNode;
    //when execute this line, btn will removed together
    toDoList.removeChild(list);
    const cleanToDos = toDos.filter(function(toDo){return toDo.id !== parseInt(list.id);});
    console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
    */
   

function saveToDos(){

    //toDo is the list
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    console.log("done");
}


function paintToDos(text){
    const list = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    
    //make sure to add small things first
    list.appendChild(delBtn);
    list.appendChild(span);
    list.id = newId;
    toDoList.appendChild(list);
    const toDoObj = {
        text: text,
        id: newId

    };
    toDos.push(toDoObj);
    saveToDos();
   console.log(text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function loadTodos(){
    const currentValue = localStorage.getItem(TODO_LS);
    if (currentValue !== null){
        const parsedToDos = JSON.parse(currentValue);
        parsedToDos.forEach(function(todo){
            paintToDos(todo.text);
        });
    }
}

//loadTodos if localstoarage.getItem(Todo) is not null
function init(){
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();