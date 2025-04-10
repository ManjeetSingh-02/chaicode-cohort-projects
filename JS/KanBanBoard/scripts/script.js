import { changeTheme, checkTheme, changeThemeMode } from "./themeFns.js";
import { createErrorMsg } from "./errMsgFn.js";
import { togglePopup, openTaskPopup, closeTaskPopup, closeEditPopup } from "./popupFns.js";
import { saveTasks, checkTasks, addTask, updateBoardCount, finishedTasks, ongoingTasks, pendingTasks, pendingTasksDiv, ongoingTasksDiv, finishedTasksDiv } from "./tasksFns.js";
import { getDate } from "./utilsFns.js";
import { finishedUpdate, ongoingUpdate, pendingUpdate } from "./dragOverFns.js";

const taskSubmitBtn = document.getElementById("taskSubmitBtn");
const taskEditBtn = document.getElementById("taskEditBtn");
const taskNameInput = document.getElementById("taskNameInput");
const taskEditInput = document.getElementById("taskEditInput");

changeThemeMode.addEventListener("click", changeTheme);

openTaskPopup.addEventListener("click", () => togglePopup("taskPopup", true));
closeTaskPopup.addEventListener("click", () => togglePopup("taskPopup", false));
closeEditPopup.addEventListener("click", () => togglePopup("editPopup", false));

taskSubmitBtn.addEventListener("click", () => {
  if (!taskNameInput.value || taskNameInput.value.trim() === "") createErrorMsg("Task name is required");
  else {
    const taskObj = {
      taskId: Date.now(),
      taskName: taskNameInput.value.trim(),
      taskType: "pending",
      taskTimenDate: getDate(),
    };
    addTask(taskNameInput.value.trim(), "pending", taskObj.taskTimenDate);
    pendingTasks.push(taskObj);
    saveTasks("kbc-pending-tasks", pendingTasks);
    updateBoardCount("pending");
    taskNameInput.value = "";
    togglePopup("taskPopup", false);
  }
});

taskEditBtn.addEventListener("click", () => {
  if (!taskEditInput.value || taskEditInput.value.trim() === "") createErrorMsg("Task name is required");
  else {
    const editingSpanElement = document.querySelector("span[editing=true]");
    const editingSpanType = editingSpanElement.getAttribute("editingType");
    const oldTaskName = editingSpanElement.textContent;
    editingSpanElement.textContent = taskEditInput.value.trim();
    if (editingSpanType === "pending") {
      const taskIndex = pendingTasks.findIndex((task) => task.taskName === oldTaskName);
      pendingTasks[taskIndex].taskName = taskEditInput.value.trim();
      saveTasks("kbc-pending-tasks", pendingTasks);
    } else if (editingSpanType === "ongoing") {
      const taskIndex = ongoingTasks.findIndex((task) => task.taskName === oldTaskName);
      ongoingTasks[taskIndex].taskName = taskEditInput.value.trim();
      saveTasks("kbc-ongoing-tasks", ongoingTasks);
    } else {
      const taskIndex = finishedTasks.findIndex((task) => task.taskName === oldTaskName);
      finishedTasks[taskIndex].taskName = taskEditInput.value.trim();
      saveTasks("kbc-finished-tasks", finishedTasks);
    }
    taskEditInput.value = "";
    editingSpanElement.removeAttribute("editing");
    editingSpanElement.removeAttribute("editingType");
    togglePopup("editPopup", false);
  }
});

pendingTasksDiv.addEventListener("dragover", () => {
  const draggingTask = document.querySelector("div[dragging=true]");
  const draggingTaskType = draggingTask.getAttribute("taskType");
  if (draggingTaskType === "pending") return;
  const originalTaskN = draggingTask.querySelectorAll("div")[1].querySelector("span");
  let taskObj = null;
  if (draggingTaskType === "ongoing") taskObj = ongoingUpdate(ongoingTasks, originalTaskN);
  if (draggingTaskType === "finished") taskObj = finishedUpdate(finishedTasks, originalTaskN);
  taskObj.taskType = "pending";
  pendingTasks.push(taskObj);
  saveTasks("kbc-pending-tasks", pendingTasks);
  updateBoardCount("pending");
  draggingTask.setAttribute("taskType", "pending");
  pendingTasksDiv.appendChild(draggingTask);
});

ongoingTasksDiv.addEventListener("dragover", () => {
  const draggingTask = document.querySelector("div[dragging=true]");
  const draggingTaskType = draggingTask.getAttribute("taskType");
  const originalTaskN = draggingTask.querySelectorAll("div")[1].querySelector("span");
  if (draggingTaskType === "ongoing") return;
  let taskObj = null;
  if (draggingTaskType === "pending") taskObj = pendingUpdate(pendingTasks, originalTaskN);
  if (draggingTaskType === "finished") taskObj = finishedUpdate(finishedTasks, originalTaskN);
  taskObj.taskType = "ongoing";
  ongoingTasks.push(taskObj);
  saveTasks("kbc-ongoing-tasks", ongoingTasks);
  updateBoardCount("ongoing");
  draggingTask.setAttribute("taskType", "ongoing");
  ongoingTasksDiv.appendChild(draggingTask);
});

finishedTasksDiv.addEventListener("dragover", () => {
  const draggingTask = document.querySelector("div[dragging=true]");
  const draggingTaskType = draggingTask.getAttribute("taskType");
  const originalTaskN = draggingTask.querySelectorAll("div")[1].querySelector("span");
  if (draggingTaskType === "finished") return;
  let taskObj = null;
  if (draggingTaskType === "pending") taskObj = pendingUpdate(pendingTasks, originalTaskN);
  if (draggingTaskType === "ongoing") taskObj = ongoingUpdate(ongoingTasks, originalTaskN);
  taskObj.taskType = "finished";
  finishedTasks.push(taskObj);
  saveTasks("kbc-finished-tasks", finishedTasks);
  updateBoardCount("finished");
  draggingTask.setAttribute("taskType", "finished");
  finishedTasksDiv.appendChild(draggingTask);
});

checkTheme();
checkTasks();
