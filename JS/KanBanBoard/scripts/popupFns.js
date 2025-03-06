const openTaskPopup = document.getElementById("openTaskPopup");
const closeTaskPopup = document.getElementById("closeTaskPopup");
const closeEditPopup = document.getElementById("closeEditPopup");
const main = document.getElementsByTagName("main")[0];

function togglePopup(popupType, isOpen) {
  const popup = document.getElementById(popupType);
  if (isOpen) {
    main.classList.replace("opacity-100", "opacity-10");
    popup.classList.replace("-translate-y-[100%]", "translate-y-0");
    popup.classList.replace("top-0", "top-2");
  } else {
    main.classList.replace("opacity-10", "opacity-100");
    popup.classList.replace("translate-y-0", "-translate-y-[100%]");
    popup.classList.replace("top-2", "top-0");
  }
}

export { togglePopup, openTaskPopup, closeTaskPopup, closeEditPopup };
