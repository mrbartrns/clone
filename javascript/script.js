// strings arr랑 objarr랑 갯수를 맞추기
const scriptInput = document.querySelector(".script");
const showing = document.querySelector(".showing");
const showingP = showing.querySelector("p");
const modes = document.querySelectorAll(".mode");
const ENTER = 13;
const BACKSPACE = 8;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const SELECTED = "selected";
const action = document.querySelector(`.${SELECTED}`).dataset.type;

let dialogObjects = [];
let stringsLength = 0;
let currentLine = 1;
// END OF GLOBAL SCOPE'S VARIABLES

function Dialog(action) {
    this.row = dialogObjects.length + 1;
    this.action = action;
    this.script = "";
}

Dialog.prototype.getRow = function() {
    return this.row;
}

Dialog.prototype.getAction = function() {
    return this.action;
}

Dialog.prototype.getScript = function() {
    return this.script;
}

Dialog.prototype.setRow = function(row) {
    this.row = row;
}

Dialog.prototype.setAction = function(action) {
    this.action = action;
}

Dialog.prototype.setScript = function(text) {
    this.script = text;
}
// END OF OBJECTS

function getType(row) {
    // 줄을 바탕으로 버튼에 어떤 action인지 표시한다.
    const currentAction = dialogObjects[row - 1].getAction();
    console.log(currentAction);
    modes[0].classList.remove(SELECTED);
    modes[1].classList.remove(SELECTED);
    if (currentAction === "dialog") {
        modes[0].classList.add(SELECTED);
    } else {
        modes[1].classList.add(SELECTED);
    }
}

function refreshDialogs(strings) {
    dialogObjects.forEach((object,index) => {
        object.setRow(index + 1);
        object.setScript(strings[index]);
    })
}

function getTextArr() {
    const value = scriptInput.value;
    const strings = value.split("\n");
    return strings;
}

function getRow(textarea) {
    const txts = textarea.value;
    const txtsArr = txts.split("\n");
    const cursorPoint = textarea.selectionStart;
    let lineStart = 0;
    for (let i = 0; i < txtsArr.length; i++) {
        let lineEnd = lineStart + txtsArr[i].length + 1;
        if (lineStart <= cursorPoint && cursorPoint < lineEnd) {
            const lineIndex = i + 1;
            return lineIndex;
        } else {
            lineStart = lineEnd;
        }
    }
}

function getDraggedRows(textarea, rowStart) {
    const txts = textarea.value;
    const txtsArr = txts.split("\n");
    const cursorEnd = textarea.selectionEnd;
    let lineStart = 0;
    for (let i = 0; i < txtsArr.length; i++) {
        let lineEnd = lineStart + txtsArr[i].length + 1;
        if (lineStart <= cursorEnd && cursorEnd < lineEnd) {
            const rowEnd = i + 1;
            const draggedLines = rowEnd - rowStart + 1;
            return draggedLines;
        } else {
            lineStart = lineEnd;
        }
    }
}

function handleEnter() {
    const strings = getTextArr();
    const action = document.querySelector(`.${SELECTED}`).dataset.type;
    console.log(strings);
    const row = getRow(scriptInput);
    currentLine = row;
    const dialogObject = new Dialog(action);
    dialogObjects.splice(row - 1, 0, dialogObject);
    console.log(dialogObjects);
    refreshDialogs(strings);
    stringsLength = strings.length;
}

function handleBackSpace() {
    const strings = getTextArr();
    const row = getRow(scriptInput);
    currentLine = row;
    let currentLength = strings.length;
    let lengths = stringsLength - currentLength;
    if (lengths > 0) {
        dialogObjects.splice(row, lengths);
        stringsLength = currentLength;
        refreshDialogs(strings);
        console.log(dialogObjects);
    }
}

// todo: modify setUpMode when I select row showing action
function setUpMode() {
    const row = getRow(scriptInput);
    modes[0].classList.remove(SELECTED);
    modes[1].classList.remove(SELECTED);
    this.classList.add(SELECTED);
    const action = document.querySelector(`.${SELECTED}`).dataset.type;
    // drag 구현하기
    if (scriptInput.selectionStart !== scriptInput.selectionEnd) {
        const draggedLines = getDraggedRows(scriptInput, row);
        for (let i = row - 1; i < row - 1 + draggedLines; i++) {
            dialogObjects[i].setAction(action);
        }
    } else {
        //드래그 안했을때
        dialogObjects[row - 1].setAction(action);
    }
    console.log(dialogObjects);
}

function init() {            
    const dialogObject = new Dialog(action);
    dialogObjects.push(dialogObject);

    modes.forEach( mode => {
        mode.addEventListener("click", setUpMode);
    });

    scriptInput.addEventListener("keyup", function(e) {
        if (e.keyCode === ENTER) {
            handleEnter();
        } else if (e.keyCode === BACKSPACE) {
            handleBackSpace();
        } else if (e.keyCode === UP_ARROW_KEY) {
            if (currentLine > 1) {
                currentLine -= 1;
                console.log(currentLine);
            }
        } else if (e.keyCode === DOWN_ARROW_KEY) {
            if (currentLine < dialogObjects.length) {
                currentLine += 1;
                console.log(currentLine);
            }
        }
    });

    //toDo: scriptInput.addEventListener("click", handleClick);
    scriptInput.addEventListener("click", function() {
        const row = getRow(scriptInput);
        currentLine = row;
        console.log(row);
        getType(row);
    });
}

init();

//todo: whenever clicking 'submit'button, set all objects in localstorage and get localstorage and display it on the textarea