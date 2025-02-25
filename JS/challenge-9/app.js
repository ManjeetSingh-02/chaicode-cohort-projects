/**
 * Write your challenge solution here
 */

let toggleBtn = document.getElementsByClassName("toggle-btn");
let closeBtn = document.getElementsByClassName("close-btn");
let panel = document.getElementsByClassName("panel");
let menuItems = document.querySelectorAll(".menu-item");

toggleBtn.item(0).addEventListener("click", () => {
  panel.item(0).classList.toggle("active");
  toggleBtn.item(0).innerText = toggleBtn.item(0).innerText === "Open Menu" ? "Close Menu" : "Open Menu";
});

closeBtn.item(0).addEventListener("click", () => {
  panel.item(0).classList.remove("active");
  toggleBtn.item(0).innerText = "Open Menu";
});

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    alert("You clicked on " + menuItem.innerText);
    panel.item(0).classList.remove("active");
  });
});
