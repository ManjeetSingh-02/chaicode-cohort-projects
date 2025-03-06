const errMsg = document.getElementById("errMsg");

function createErrorMsg(msg) {
  errMsg.textContent = msg;
  errMsg.classList.replace("translate-x-[100%]", "translate-x-0");
  errMsg.classList.replace("right-0", "right-2");
  setTimeout(() => {
    errMsg.classList.replace("translate-x-0", "translate-x-[100%]");
    errMsg.classList.replace("right-2", "right-0");
  }, 3000);
}

export { createErrorMsg };
