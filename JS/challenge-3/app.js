/**
 * Write your challenge solution here
 */

let nameInput = document.getElementById("nameInput");
let jobInput = document.getElementById("jobInput");
let ageInput = document.getElementById("ageInput");
let bioInput = document.getElementById("bioInput");
let nameDisplay = document.getElementById("nameDisplay");
let jobDisplay = document.getElementById("jobDisplay");
let ageDisplay = document.getElementById("ageDisplay");
let bioDisplay = document.getElementById("bioDisplay");

nameInput.addEventListener("input", () => {
  if (nameInput.value === "") nameDisplay.textContent = "Not Provided";
  else nameDisplay.textContent = nameInput.value;
});

jobInput.addEventListener("input", () => {
  if (jobInput.value === "") jobDisplay.textContent = "Not Provided";
  else jobDisplay.textContent = jobInput.value;
});

ageInput.addEventListener("input", () => {
  if (ageInput.value === "") ageDisplay.textContent = "Not Provided";
  else ageDisplay.textContent = ageInput.value;
});

bioInput.addEventListener("input", () => {
  if (bioInput.value === "") bioDisplay.textContent = "Not Provided";
  else bioDisplay.textContent = bioInput.value;
});
