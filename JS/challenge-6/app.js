/**
 * Write your challenge solution here
 */

let hourHand = document.querySelector(".hour");
let minuteHand = document.querySelector(".minute");
let secondHand = document.querySelector(".second");
let digitalClock = document.querySelector(".digital-clock");
let date = document.querySelector(".date");

function setTime() {
  let period = "AM";
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let minuteDeg = minutes * 6;
  let secondDeg = seconds * 6;

  if (hours >= 12) period = "PM";
  let hourDeg = (hours % 12) * 30 + minutes * 0.5;
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  hourHand.style.transform = `rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `rotate(${secondDeg}deg)`;

  digitalClock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
  date.textContent = currentDate.toDateString();
}

setTime();
setInterval(setTime, 1000);
