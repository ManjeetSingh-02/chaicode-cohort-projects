import { changeTheme, checkTheme, changeThemeMode } from "./themeFns.js";
import { createErrorMsg } from "./errMsgFn.js";
import { togglePopup, openTaskPopup, closeTaskPopup, closeEditPopup } from "./popupFns.js";
import { saveTasks, checkTasks, addTask, updateBoardCount, finishedTasks, ongoingTasks, pendingTasks } from "./tasksFns.js";

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
    addTask(taskNameInput.value.trim(), "pending");
    const taskObj = {
      taskId: Date.now(),
      taskName: taskNameInput.value.trim(),
      taskType: "pending",
    };
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
    const editingSpanType = editingSpanElement.getAttribute("type");
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
    editingSpanElement.removeAttribute("type");
    togglePopup("editPopup", false);
  }
});

checkTheme();
checkTasks();
