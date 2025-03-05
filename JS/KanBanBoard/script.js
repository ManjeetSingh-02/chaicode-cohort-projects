const pendingTasksDiv = document.getElementById("pendingTasksDiv");
const pendingTasksCounter = document.getElementById("pendingTasksCounter");
const ongoingTasksDiv = document.getElementById("ongoingTasksDiv");
const ongoingTasksCounter = document.getElementById("ongoingTasksCounter");
const finishedTasksDiv = document.getElementById("finishedTasksDiv");
const finishedTasksCounter = document.getElementById("finishedTasksCounter");

const changeThemeMode = document.getElementById("changeThemeMode");
const themeImg = document.getElementById("change-theme");
const errMsg = document.getElementById("errMsg");

const openTaskPopup = document.getElementById("openTaskPopup");
const closeTaskPopup = document.getElementById("closeTaskPopup");
const taskSubmitBtn = document.getElementById("taskSubmitBtn");
const taskNameInput = document.getElementById("taskNameInput");

const closeEditPopup = document.getElementById("closeEditPopup");
const taskEditBtn = document.getElementById("taskEditBtn");
const taskEditInput = document.getElementById("taskEditInput");

const pendingTasks = localStorage.getItem("kbc-pending-tasks") ? JSON.parse(localStorage.getItem("kbc-pending-tasks")) : [];
let totalPendingTasks = 0;
const ongoingTasks = localStorage.getItem("kbc-ongoing-tasks") ? JSON.parse(localStorage.getItem("kbc-ongoing-tasks")) : [];
let totalOngoingTasks = 0;
const finishedTasks = localStorage.getItem("kbc-finished-tasks") ? JSON.parse(localStorage.getItem("kbc-finished-tasks")) : [];
let totalFinishedTasks = 0;

changeThemeMode.addEventListener("click", changeTheme);
openTaskPopup.addEventListener("click", () => togglePopup("taskPopup", true));
closeTaskPopup.addEventListener("click", () => togglePopup("taskPopup", false));
taskSubmitBtn.addEventListener("click", () => {
  if (!taskNameInput.value || taskNameInput.value.trim() === "") createErrorMsg("Task name is required");
  else {
    addTask(taskNameInput.value.trim());
    taskNameInput.value = "";
    togglePopup("taskPopup", false);
  }
});
closeEditPopup.addEventListener("click", () => togglePopup("editPopup", false));
taskEditBtn.addEventListener("click", () => {
  if (!taskEditInput.value || taskEditInput.value.trim() === "") createErrorMsg("Task name is required");
  else {
    const editingSpan = document.querySelector("span[editing=true]");
    editingSpan.textContent = taskEditInput.value.trim();
    taskEditInput.value = "";
    editingSpan.removeAttribute("editing");
    togglePopup("editPopup", false);
  }
});

function changeTheme() {
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("kbc-theme", "light");
    checkTheme();
  } else {
    localStorage.setItem("kbc-theme", "dark");
    checkTheme();
  }
}

function createErrorMsg(msg) {
  errMsg.textContent = msg;
  errMsg.classList.replace("translate-x-[100%]", "translate-x-0");
  errMsg.classList.replace("right-0", "right-2");
  setTimeout(() => {
    errMsg.classList.replace("translate-x-0", "translate-x-[100%]");
    errMsg.classList.replace("right-2", "right-0");
  }, 3000);
}

function checkTheme() {
  if (localStorage.getItem("kbc-theme") === null) {
    localStorage.setItem("kbc-theme", "light");
    document.documentElement.classList.remove("dark");
    themeImg.src = "./icons/icons8-moon.svg";
  } else if (localStorage.getItem("kbc-theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeImg.src = "./icons/icons8-sun.svg";
  } else {
    document.documentElement.classList.remove("dark");
    themeImg.src = "./icons/icons8-moon.svg";
  }
}

function getDate() {
  const date = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString(undefined, dateOptions);
}

function getImage(src, height, width, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.height = height;
  img.width = width;
  img.alt = alt;
  return img;
}

function updateBoardCount(boardType) {
  if (boardType === "pending") pendingTasksCounter.textContent = pendingTasks.length;
  else if (boardType === "ongoing") ongoingTasksCounter.textContent = ongoingTasks.length;
  else finishedTasksCounter.textContent = finishedTasks.length;
}

function togglePopup(popupType, isOpen) {
  const popup = document.getElementById(popupType);
  const main = document.getElementsByTagName("main")[0];
  if (isOpen) {
    main.classList.replace("opacity-100", "opacity-10");
    popup.classList.replace("-translate-y-[100%]", "translate-y-0");
    popup.classList.replace("top-0", "top-2");
  } else {
    main.classList.replace("opacity-10", "opacity-100");
    popup.classList.replace("translate-y-0", "-translate-y-[100%]");
    popup.classList.replace("top-2", "top-0");
  }
}

function addTask(taskName) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("border-2", "w-full", "rounded-lg", "p-4", "font-bold", "flex", "flex-col", "items-center", "justify-center", "gap-4");

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("border-b-2", "border-gray-500", "w-full", "text-center", "flex", "flex-col", "items-center", "justify-center", "gap-1", "pb-1");
  const pendingDate = document.createElement("span");
  pendingDate.classList.add("text-red-500");
  pendingDate.textContent = getDate();
  timeDiv.appendChild(pendingDate);

  const taskNameSpan = document.createElement("span");
  taskNameSpan.classList.add("w-[90%]", "break-words");
  taskNameSpan.textContent = taskName;

  const editButton = document.createElement("button");
  editButton.classList.add("bg-yellow-500", "p-2", "rounded-full", "cursor-pointer", "border-2");
  const editButtonImg = getImage("./icons/icons8-edit.svg", 20, 20, "Edit");
  editButton.appendChild(editButtonImg);
  editButton.addEventListener("click", () => {
    taskNameSpan.setAttribute("editing", true);
    togglePopup("editPopup", true);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("bg-red-500", "p-2", "rounded-full", "cursor-pointer", "border-2");
  const deleteButtonImg = getImage("./icons/icons8-delete.svg", 20, 20, "Delete");
  deleteButton.appendChild(deleteButtonImg);
  deleteButton.addEventListener("click", () => {
    mainDiv.remove();
    totalPendingTasks--;
    pendingTasksCounter.textContent = totalPendingTasks;
  });

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("flex", "items-center", "justify-center", "gap-4", "flex-col");
  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex", "w-full", "justify-between", "gap-2");
  infoDiv.appendChild(taskNameSpan);
  infoDiv.appendChild(buttonsDiv);

  mainDiv.appendChild(timeDiv);
  mainDiv.appendChild(infoDiv);

  pendingTasksDiv.appendChild(mainDiv);
  totalPendingTasks++;
  pendingTasksCounter.textContent = totalPendingTasks;
}

checkTheme();
// function loadTask(task) {}
// if (pendingTasks.length > 0) pendingTasks.forEach((task) => loadTask(task));
// if (ongoingTasks.length > 0) ongoingTasks.forEach((task) => loadTask(task));
// if (finishedTasks.length > 0) finishedTasks.forEach((task) => loadTask(task));
