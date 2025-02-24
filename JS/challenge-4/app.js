/**
 * Write your challenge solution here
 */

let btn = document.getElementById("addButton");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let emptyList = document.getElementById("emptyList");
let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");

let totalT = 0;
let completedT = 0;
btn.addEventListener("click", () => {
  if (taskInput.value) {
    let li = document.createElement("li");
    li.classList.add("task-item");

    let span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = taskInput.value;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("complete-checkbox");
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        li.classList.add("completed");
        completedT++;
        completedTasks.textContent = `Completed tasks: ${completedT}`;
      } else {
        li.classList.remove("completed");
        completedT--;
        completedTasks.textContent = `Completed tasks: ${completedT}`;
      }
    });

    let button = document.createElement("button");
    button.classList.add("delete-button");
    button.textContent = "Delete";
    button.addEventListener("click", () => {
      li.remove();
      totalT--;
      totalTasks.textContent = `Total tasks: ${totalT}`;
      if (checkbox.checked) {
        completedT--;
        completedTasks.textContent = `Completed tasks: ${completedT}`;
      }
      if (totalT === 0) emptyList.style.display = "block";
    });

    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(button);

    taskList.appendChild(li);
    taskInput.value = "";
    totalT++;
    totalTasks.textContent = `Total tasks: ${totalT}`;
    if (totalT > 0) emptyList.style.display = "none";
  } else {
    alert("Please enter a task");
  }
});
