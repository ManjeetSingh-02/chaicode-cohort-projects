const dropdownBtn = document.getElementById("dropdownBtn");

dropdownBtn.addEventListener("click", () => {
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("show");
  if (dropdownMenu.classList.contains("show")) dropdownBtn.textContent = "Close Dropdown Menu";
  else dropdownBtn.textContent = "Open Dropdown Menu";
});

function changeColor(colorName = "") {
  const colorBox = document.getElementById("colorBox");
  return function () {
    if (colorName === "custom") {
      let customColor = prompt("Enter a hex code(#000000): ");
      colorName = customColor;
    }
    colorBox.style.backgroundColor = colorName;
  };
}
