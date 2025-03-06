import { getDate, getImage } from "./utilsFns.js";
import { togglePopup } from "./popupFns.js";

const pendingTasksDiv = document.getElementById("pendingTasksDiv");
const ongoingTasksDiv = document.getElementById("ongoingTasksDiv");
const finishedTasksDiv = document.getElementById("finishedTasksDiv");

const pendingTasksCounter = document.getElementById("pendingTasksCounter");
const ongoingTasksCounter = document.getElementById("ongoingTasksCounter");
const finishedTasksCounter = document.getElementById("finishedTasksCounter");

let pendingTasks = JSON.parse(localStorage.getItem("kbc-pending-tasks"));
let ongoingTasks = JSON.parse(localStorage.getItem("kbc-ongoing-tasks"));
let finishedTasks = JSON.parse(localStorage.getItem("kbc-finished-tasks"));

function checkTasks() {
  if (localStorage.getItem("kbc-pending-tasks") === null) {
    localStorage.setItem("kbc-pending-tasks", JSON.stringify([]));
    pendingTasks = [];
  } else pendingTasks.forEach((task) => loadTask(task));

  if (localStorage.getItem("kbc-ongoing-tasks") === null) {
    localStorage.setItem("kbc-ongoing-tasks", JSON.stringify([]));
    ongoingTasks = [];
  } else ongoingTasks.forEach((task) => loadTask(task));

  if (localStorage.getItem("kbc-finished-tasks") === null) {
    localStorage.setItem("kbc-finished-tasks", JSON.stringify([]));
    finishedTasks = [];
  } else finishedTasks.forEach((task) => loadTask(task));
}

function updateBoardCount(boardType) {
  if (boardType === "pending") pendingTasksCounter.textContent = pendingTasks.length;
  else if (boardType === "ongoing") ongoingTasksCounter.textContent = ongoingTasks.length;
  else finishedTasksCounter.textContent = finishedTasks.length;
}

function saveTasks(key, tasks) {
  localStorage.setItem(key, JSON.stringify(tasks));
}

function loadTask(task) {
  addTask(task.taskName, task.taskType);
  updateBoardCount(task.taskType);
}

function addTask(taskName, taskType) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("border-2", "w-full", "rounded-lg", "p-4", "font-bold", "flex", "flex-col", "items-center", "justify-center", "gap-4");

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("border-b-2", "border-gray-500", "w-full", "text-center", "flex", "flex-col", "items-center", "justify-center", "gap-1", "pb-1");
  const currentDate = document.createElement("span");
  currentDate.classList.add("text-red-500");
  currentDate.textContent = getDate();
  timeDiv.appendChild(currentDate);

  const taskNameSpan = document.createElement("span");
  taskNameSpan.classList.add("w-[90%]", "break-words");
  taskNameSpan.textContent = taskName;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("flex", "items-center", "justify-center", "gap-4", "flex-col");

  const editButton = document.createElement("button");
  editButton.classList.add("bg-yellow-500", "p-2", "rounded-full", "cursor-pointer", "border-2");
  const editButtonImg = getImage("./icons/icons8-edit.svg", 20, 20, "Edit");
  editButton.appendChild(editButtonImg);
  editButton.addEventListener("click", () => {
    taskNameSpan.setAttribute("editing", true);
    taskNameSpan.setAttribute("type", taskType);
    togglePopup("editPopup", true);
  });
  buttonsDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("bg-red-500", "p-2", "rounded-full", "cursor-pointer", "border-2");
  const deleteButtonImg = getImage("./icons/icons8-delete.svg", 20, 20, "Delete");
  deleteButton.appendChild(deleteButtonImg);
  deleteButton.addEventListener("click", () => {
    if (taskType === "pending") {
      pendingTasks = pendingTasks.filter((task) => task.taskName !== taskNameSpan.textContent);
      saveTasks("kbc-pending-tasks", pendingTasks);
    } else if (taskType === "ongoing") {
      ongoingTasks = ongoingTasks.filter((task) => task.taskName !== taskNameSpan.textContent);
      saveTasks("kbc-ongoing-tasks", ongoingTasks);
    } else {
      finishedTasks = finishedTasks.filter((task) => task.taskName !== taskNameSpan.textContent);
      saveTasks("kbc-finished-tasks", finishedTasks);
    }
    mainDiv.remove();
    updateBoardCount(taskType);
  });
  buttonsDiv.appendChild(deleteButton);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex", "w-full", "justify-between", "gap-2");
  infoDiv.appendChild(taskNameSpan);
  infoDiv.appendChild(buttonsDiv);

  mainDiv.appendChild(timeDiv);
  mainDiv.appendChild(infoDiv);

  if (taskType === "pending") pendingTasksDiv.appendChild(mainDiv);
  else if (taskType === "ongoing") ongoingTasksDiv.appendChild(mainDiv);
  else finishedTasksDiv.appendChild(mainDiv);
}

export { saveTasks, checkTasks, addTask, updateBoardCount, pendingTasks, ongoingTasks, finishedTasks };
