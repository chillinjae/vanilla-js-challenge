const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pending = document.querySelector("#pending");
const finished = document.querySelector("#finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pendingList = [];
let finishedList = [];

function setStatus(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const category = li.parentNode;
    category.removeChild(li);
    if (btn.className === "img-pending") {
        finished.appendChild(li);
        btn.className = "img-finished";
        btn.src = "icon/checked.png";
        const newPendingList = [];
        pendingList.forEach(function (pending) {
            if (pending.id != parseInt(li.id)) {
                newPendingList.push(pending);
            } else {
                finishedList.push(pending);
            }
        });
        pendingList = newPendingList;
    } else if (event.target.className === "img-finished") {
        pending.appendChild(li);
        btn.className = "img-pending";
        btn.src = "icon/unchecked.png";
        const newFinishedList = [];
        finishedList.forEach(function (finished) {
            if (finished.id != parseInt(li.id)) {
                newFinishedList.push(finished);
            } else {
                pendingList.push(finished);
            }
            finishedList = newFinishedList;
        });
    }
    saveTodo();
}

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const category = li.parentNode;
    category.removeChild(li);

    const cleanPendingList = pendingList.filter(function (pending) {
        return pending.id !== parseInt(li.id);
    });
    const cleanFinishedList = finishedList.filter(function (finished) {
        return finished.id !== parseInt(li.id);
    });

    pendingList = cleanPendingList;
    finishedList = cleanFinishedList;
    saveTodo();
}

function addPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("input");
    const statusBtn = document.createElement("input");
    const span = document.createElement("span");
    const newId = pendingList.length + finishedList.length + 1;

    statusBtn.type = "image";
    statusBtn.name = "button";
    statusBtn.src = "icon/unchecked.png";
    statusBtn.className = "img-pending";
    statusBtn.style.width = "16px";
    statusBtn.style.height = "16px";
    statusBtn.addEventListener("click", setStatus);

    delBtn.type = "image";
    delBtn.name = "button";
    delBtn.src = "icon/delete.png";
    delBtn.className = "img-delete";
    delBtn.style.width = "16px";
    delBtn.style.height = "16px";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = `${text}  `;
    li.appendChild(statusBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    pending.appendChild(li);

    const taskObj = {
        text: text,
        id: newId,
    };

    pendingList.push(taskObj);
    saveTodo();
}

function addFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("input");
    const statusBtn = document.createElement("input");
    const span = document.createElement("span");
    const newId = pendingList.length + finishedList.length + 1;

    statusBtn.type = "image";
    statusBtn.name = "button";
    statusBtn.src = "icon/checked.png";
    statusBtn.className = "img-finished";
    statusBtn.style.width = "16px";
    statusBtn.style.height = "16px";
    statusBtn.addEventListener("click", setStatus);

    delBtn.type = "image";
    delBtn.name = "button";
    delBtn.src = "icon/delete.png";
    delBtn.className = "img-delete";
    delBtn.style.width = "16px";
    delBtn.style.height = "16px";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = `${text}  `;
    li.appendChild(statusBtn);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    finished.appendChild(li);

    const taskObj = {
        text: text,
        id: newId,
    };

    finishedList.push(taskObj);
    saveTodo();
}

function saveTodo() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
}

function loadTodo() {
    const loadedPendingList = localStorage.getItem(PENDING_LS);
    const loadedFinishedList = localStorage.getItem(FINISHED_LS);
    if (loadedPendingList !== null) {
        const parsePendingList = JSON.parse(loadedPendingList);
        parsePendingList.forEach(function (pending) {
            addPending(pending.text);
        });
    } else {
    }

    if (loadedFinishedList !== null) {
        const parseFinishedList = JSON.parse(loadedFinishedList);
        parseFinishedList.forEach(function (finished) {
            addFinished(finished.text);
        });
    } else {
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    addPending(currentValue);
    toDoInput.value = "";
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadTodo();
}

init();
