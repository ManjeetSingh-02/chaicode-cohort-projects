import { saveTasks, updateBoardCount } from "./tasksFns.js";

const obj = {
  taskId: null,
  taskName: null,
  taskType: null,
  taskTimenDate: null,
};

function pendingUpdate(pendingTasks, originalTaskN) {
  const taskIndex = pendingTasks.findIndex((task) => task.taskName === originalTaskN.textContent);
  obj.taskId = pendingTasks[taskIndex].taskId;
  obj.taskName = pendingTasks[taskIndex].taskName;
  obj.taskTimenDate = pendingTasks[taskIndex].taskTimenDate;
  pendingTasks.splice(taskIndex, 1);
  saveTasks("kbc-pending-tasks", pendingTasks);
  updateBoardCount("pending");
  return obj;
}

function ongoingUpdate(ongoingTasks, originalTaskN) {
  const taskIndex = ongoingTasks.findIndex((task) => task.taskName === originalTaskN.textContent);
  obj.taskId = ongoingTasks[taskIndex].taskId;
  obj.taskName = ongoingTasks[taskIndex].taskName;
  obj.taskTimenDate = ongoingTasks[taskIndex].taskTimenDate;
  ongoingTasks.splice(taskIndex, 1);
  saveTasks("kbc-ongoing-tasks", ongoingTasks);
  updateBoardCount("ongoing");
  return obj;
}

function finishedUpdate(finishedTasks, originalTaskN) {
  const taskIndex = finishedTasks.findIndex((task) => task.taskName === originalTaskN.textContent);
  obj.taskId = finishedTasks[taskIndex].taskId;
  obj.taskName = finishedTasks[taskIndex].taskName;
  obj.taskTimenDate = finishedTasks[taskIndex].taskTimenDate;
  finishedTasks.splice(taskIndex, 1);
  saveTasks("kbc-finished-tasks", finishedTasks);
  updateBoardCount("finished");
  return obj;
}

export { pendingUpdate, ongoingUpdate, finishedUpdate };
