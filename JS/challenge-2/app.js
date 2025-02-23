/**
 * Write your challenge solution here
 */

let redButton = document.getElementById("redButton");
let greenButton = document.getElementById("greenButton");
let blueButton = document.getElementById("blueButton");
let purpleButton = document.getElementById("purpleButton");
let resetButton = document.getElementById("resetButton");
let mainHeading = document.getElementById("mainHeading");

redButton.addEventListener("click", () => {
  mainHeading.style.color = "red";
});
greenButton.addEventListener("click", () => {
  mainHeading.style.color = "green";
});
blueButton.addEventListener("click", () => {
  mainHeading.style.color = "blue";
});
purpleButton.addEventListener("click", () => {
  mainHeading.style.color = "purple";
});
resetButton.addEventListener("click", () => {
  mainHeading.style.color = "black";
});
