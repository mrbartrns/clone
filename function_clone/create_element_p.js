//사고 순서 그대로 따라가기
//global scope
//3-1. taskForm 객체를 만들고 이벤트를 감지할 수 있게 한다.
const taskForm = document.querySelector(".todo-form");
//4-1. localStorage에 저장하기 위한 key
const TASK_LS = "task";
//5-1. input값을 받기 위한 객체 생성
const taskInput = taskForm.querySelector(".todo-input");
//6-1. list를 만들기 위한 ul 객체 생성
const ul = document.querySelector(".list");
//6-1. list에 아이디를 부여하기 위하여, 저장하기 위하여 리스트 생성(리스트는 계속 값이 변화하므로 let사용)
let task = [];

/*9. deleteTask가 어떠한 동작을 수행해야 할 지 먼저 생각해본다.
- 버튼을 클릭하면, 클릭한 버튼의 list요소를 삭제한다.
- localstorage에는 그대로 남아있기 때문에, 이를 비교하여 list도 제거한다.
- 지운 리스트를 기존의 리스트에 반영한다. */
function deleteTask(event) {
    //버튼을 누른것이 target 버튼이 되고, 이를 부모노드까지 전달한다.
    const btn = event.target;
    const li = btn.parentNode;
    //id값을 비교하기 위하여 id 객체를 만든다.
    //이 id 값은 button으로 지워지는 id의 값이다.
    const id = li.id;
    //unordered list의 자식 객체인 li를 지운다.(한번에 지우기 위하여 ul 사용)
    ul.removeChild(li);
    console.log(task);
    //cleanTask라는 리스트를 만들고, 이는 task의 리스트에서 localstorage와 비교했을때 같은것만을 차용한다.
    const cleanTask = task.filter( element => {
        //task리스트의 id와 내가 선택하여 지운 id가 다를때에만(참일때) 요소에 추가한다.
        /*ex. 1번 태스크를 지웠다면, 1번 요소와 지운 요소가 동일: false
        1번 태스크를 지웠을 때, 2번요소와 지운 요소가 동일하지 않음: true */
        return element.id !== parseInt(id); //parseInt(id)는 변하지 않는 상수
    })
    task = cleanTask;
    console.log(cleanTask)
    saveTask();
    //const taskId = 
}
/*7. saveTask가 어떠한 동작을 수행해야 할 지 먼저 생각해본다.
- 이 함수는 리스트 자체를 localStorage에 저장하여 보관하는 역할을 한다. */
function saveTask() {
    //task를 먼저 string으로 변환해 준후 스토리지에 저장
    localStorage.setItem(TASK_LS, JSON.stringify(task));
}

/*6. paintTask가 어떠한 동작을 수행해야 될지 먼저 생각해 본다.
- 하는 역할은 오직 받은 값을 웹페이지에 표시해주는 역할.
- 받은 값을 리스트로 만든다.
- 리스트 안에는 삭제 버튼이 있어야 한다.(여기까지 paintTask가 할 일)
- 리스트 생성시, 식별하기 용이하게 id를 부여한다. id는 task를 모아둔 리스트의 길이와 연관된다.
- 리스트에 보관하기 용이및 로딩시 참고하도록 객체를 생성한다. 객체는 task와 id값을 저장한다.
- 삭제버튼은 눌렀을 때, 그 항목이 삭제되는 함수로 넘겨주어야 한다.
- 또한 표시한 값들을 새로고침 시에도 저장할수 있게 저장함수로 넘겨주어야 한다.*/
function paintTask(text) {
    /* 6-2. 어떠한 객체들을 만들어야 할지 생각해보기
    - li 객체, 버튼객체, 글씨를 쓰기 위한 span객체 */
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const span = document.createElement("span");
    // task list를 받는 객체 만들기
    const taskId = task.length + 1;
    //btn과 span에 들어갈 text 설정
    btn.innerText = "delete";
    span.innerText = text;
    //버튼을 클릭했을 시 어떠한 역할을 할지 콜백함수 지정
    btn.addEventListener("click", deleteTask);
    //li 안에 button과 span을 삽입시켜준다.
    li.appendChild(btn);
    li.appendChild(span);
    //생성되는 li에 id 부여
    li.id = taskId;
    ul.appendChild(li);
    //리스트에 저장하기 편하도록 객체를 만든다.
    const taskObject = {
        text: text,
        id: taskId
    };
    //객체를 리스트로 보낸다.
    task.push(taskObject);
    //저장하는 함수를 불러온다.
    saveTask();
}
/*5. handleSubmit이 어떤 동작을 수행해야 될지 먼저 생각해 본다.
-제출된 값을 저장한다.
-제출된 값을 표시하는 함수로 넘겨준다.
*/
function handleSubmit(event) {
    event.preventDefault();
    const taskValue = taskInput.value;
    // 5-2. taskValue 값을 표시해주는 함수로 넘겨주기
    paintTask(taskValue);
    taskInput.value = ""

}
/*4. loadTask가 어떤 동작을 수행해야 될지 먼저 생각해 본다.
- loadTask는 컴퓨터에 저장된 값을 받아온다.
- 받아온 값을 웹 페이지에 표시한다.*/
function loadTask(){
    //4-1. 불러온 값을 저장할 수 있는 객체를 만든다. 없다면 null이 표시된다.
    const taskValue = localStorage.getItem(TASK_LS);
    //4-2. 경우에 따라서 어떤 동작을 수행할 지 생각해본다. (만약 값이 없다면 or 있다면)
    if (taskValue !== null) {
        /*8. taskValue가 List의 형식으로 저장되는 것을 알았기 때문에, 
        list에서 text를 찾고, 그 text를 모두 표시하는 함수를 만든다.
        표시하는 함수는 paintTask를 재활용한다. */
        const parsedTask = JSON.parse(taskValue);
        //각 리스트의 요소에 대해서 모두 paintTask 함수 실행.
        //task는 여기서 리스트의 각 요소이고, {text: text, id: taskId} 형태
        parsedTask.forEach(task => {
            paintTask(task.text); //task만을 표시함
        });
    }

}

/*1. function init();를 만들고 안에 동사로 되어있는 함수를 쓴다. 
(이해하기 쉽게 하기 위함)*/
function init() {
    //2. 기존 todo를 불러오는 기능이 있어야 하므로, loadtask를 적어둔다.
    loadTask();
    /*3. 또한, 태스크를 불러오는 동안, 새로운 태스크를 입력 받을 수 있어야 하므로,
    form이라는 객체를 만들어 event를 감지 할 수 있게 해야 한다.
    -addEventListner는 submit의 동작이 일어나면, handleSubmit을 실행하는 callback 함수이다.*/
    taskForm.addEventListener("submit", handleSubmit);
}

init();