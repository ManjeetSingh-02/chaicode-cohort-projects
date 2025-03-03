const addTask = document.getElementById("addTask");
const addBoard = document.getElementById("addBoard");
const changeTheme = document.getElementById("changeTheme");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const submitTaskBtn = document.getElementById("submitTaskBtn");
const taskPopUp = document.getElementById("taskPopUp");
const cancelBoardBtn = document.getElementById("cancelBoardBtn");
const submitBoardBtn = document.getElementById("submitBoardBtn");
const boardPopUp = document.getElementById("boardPopUp");
const todoBoard = document.getElementById("todoBoard");
const container = document.querySelector(".container");

changeTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) changeTheme.innerHTML = `<i class="fa-solid fa-sun"></i> <span>Light Mode</span>`;
  else changeTheme.innerHTML = `<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>`;
});

function togglePopup(popup, show) {
  popup.style.display = show ? "flex" : "none";
  container.style.opacity = show ? 0.5 : 1;
}

addTask.addEventListener("click", () => togglePopup(taskPopUp, true));
cancelTaskBtn.addEventListener("click", () => togglePopup(taskPopUp, false));
submitTaskBtn.addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskColorSelector = document.getElementById("taskColorSelector");

  if (taskInput.value.trim() === "") alert("Please enter a task");
  else addTaskFn(taskInput.value.trim(), taskColorSelector.value);

  taskInput.value = "";
  togglePopup(taskPopUp, false);
});

addBoard.addEventListener("click", () => togglePopup(boardPopUp, true));
cancelBoardBtn.addEventListener("click", () => togglePopup(boardPopUp, false));
submitBoardBtn.addEventListener("click", () => {
  const boardInput = document.getElementById("boardInput");
  const boardColorSelector = document.getElementById("boardColorSelector");

  if (boardInput.value.trim() === "") alert("Please enter a board name");
  else addBoardFn(boardInput.value.trim(), boardColorSelector.value);

  boardInput.value = "";
  togglePopup(boardPopUp, false);
});

function addTaskFn(input, color) {
  const div = document.createElement("div");
  div.setAttribute("draggable", true);
  div.classList.add("task");
  div.style.border = `2px solid ${color}`;

  const p = document.createElement("p");
  p.innerText = input;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const edit = document.createElement("i");
  edit.classList.add("fa-solid", "fa-edit");
  edit.addEventListener("click", () => {
    const newInput = prompt("Edit Task", input);
    if (newInput) p.innerText = newInput;
  });
  actions.appendChild(edit);

  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");
  trash.addEventListener("click", () => div.remove());
  actions.appendChild(trash);

  div.appendChild(p);
  div.appendChild(actions);
  todoBoard.querySelector(".tasks").appendChild(div);
}

function addBoardFn(input, color) {
  const div = document.createElement("div");
  div.classList.add("board");
  div.style.border = `2px solid ${color}`;

  const h2 = document.createElement("h2");
  h2.innerText = input;

  const tasks = document.createElement("div");
  tasks.classList.add("tasks");

  div.appendChild(h2);
  div.appendChild(tasks);
  container.appendChild(div);
}
