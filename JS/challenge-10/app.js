/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

const movesSpan = document.getElementById("moves");
const timeSpan = document.getElementById("time");
const gameContainer = document.getElementById("gameContainer");

let moves = 0;
let time = 0;
let timeInterval;
let flippedCards = [];
let matchedCards = [];

function startGame() {
  createCards();
  startTimer();
}

function createCards() {
  const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);

  shuffledImages.forEach((image) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.caption = image.caption;
    card.addEventListener("click", () => flipCard(card));

    let front = document.createElement("div");
    front.classList.add("card-front");
    front.innerText = "?";

    let back = document.createElement("div");
    back.classList.add("card-back");
    back.style.backgroundImage = `url(${image.url})`;
    back.style.backgroundSize = "cover";
    back.style.backgroundPosition = "center";

    card.appendChild(front);
    card.appendChild(back);
    gameContainer.appendChild(card);
  });
}

function flipCard(card) {
  if (matchedCards.includes(card) || flippedCards.length === 2) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    matchCards();
  }
}

function matchCards() {
  const [card1, card2] = flippedCards;
  moves++;
  movesSpan.innerText = moves;

  if (card1.dataset.caption === card2.dataset.caption) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === 8) {
      clearInterval(timeInterval);
      setTimeout(() => {
        alert(`Congratulations! You won in ${time} seconds with ${moves} moves.`);
      }, 1000);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  time = 0;
  timeSpan.innerText = "0:00";
  timeInterval = setInterval(() => {
    time++;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timeSpan.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, 1000);
}

function resetGame() {
  gameContainer.innerHTML = "";
  moves = 0;
  time = 0;
  flippedCards = [];
  matchedCards = [];
  clearInterval(timeInterval);
  movesSpan.innerText = moves;
  timeSpan.innerText = "0:00";
}

document.querySelector("button").addEventListener("click", () => {
  resetGame();
  startGame();
});
startGame();
