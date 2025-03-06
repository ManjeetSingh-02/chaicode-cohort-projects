const changeThemeMode = document.getElementById("changeThemeMode");
const changeThemeImg = document.getElementById("changeThemeImg");

function checkTheme() {
  if (localStorage.getItem("kbc-theme") === null) {
    localStorage.setItem("kbc-theme", "light");
    document.documentElement.classList.remove("dark");
    changeThemeImg.src = "./icons/icons8-moon.svg";
  } else if (localStorage.getItem("kbc-theme") === "dark") {
    document.documentElement.classList.add("dark");
    changeThemeImg.src = "./icons/icons8-sun.svg";
  } else {
    document.documentElement.classList.remove("dark");
    changeThemeImg.src = "./icons/icons8-moon.svg";
  }
}

function changeTheme() {
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("kbc-theme", "light");
    checkTheme();
  } else {
    localStorage.setItem("kbc-theme", "dark");
    checkTheme();
  }
}

export { checkTheme, changeTheme, changeThemeMode };
