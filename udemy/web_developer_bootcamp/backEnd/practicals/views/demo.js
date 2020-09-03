const container = document.querySelector(".container");

function makeLists(container) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const ul = document.createElement("ul");
    span.textContent = "hello, world!";
    li.appendChild(span);
    ul.appendChild(li);
    container.appendChild(ul);
}

function init() {
    makeLists(container);
}

init();