/**
 * Write your challenge solution here
 */

let body = document.getElementById("body");
let btn = document.getElementById("toggleButton");
let statusp = document.getElementById("status");
let bulb = document.getElementById("bulb");

btn.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    statusp.textContent = "Status: Off";
    btn.textContent = "Turn On";
    bulb.classList.add("off");
  } else {
    body.classList.add("dark-mode");
    btn.textContent = "Turn Off";
    statusp.textContent = "Status: On";
    bulb.classList.remove("off");
  }
});
