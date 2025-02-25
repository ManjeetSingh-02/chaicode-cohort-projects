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

let carouselTrack = document.getElementById("carouselTrack");
let caption = document.getElementById("caption");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let carouselNav = document.getElementById("carouselNav");
let autoPlayButton = document.getElementById("autoPlayButton");
let timerDisplay = document.getElementById("timerDisplay");

let currentImageIndex = 0;
let autoPlay = false;
let autoPlayInterval;
let timer = 3;
let time = timer;

images.forEach((image, index) => {
  let slide = document.createElement("div");
  slide.classList.add("carousel-slide");
  slide.style.backgroundImage = `url(${image.url})`;
  carouselTrack.appendChild(slide);

  let indicationButton = document.createElement("span");
  indicationButton.classList.add("carousel-indicator");
  indicationButton.addEventListener("click", () => gotoSlide(index));
  carouselNav.appendChild(indicationButton);
});

let indicators = document.querySelectorAll(".carousel-indicator");

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
  caption.textContent = images[currentImageIndex].caption;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", currentImageIndex === index);
  });
}

function gotoSlide(index) {
  currentImageIndex = index;
  updateCarousel();
}

function prevSlide() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateCarousel();
}

function nextSlide() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateCarousel();
}

function startAutoPlay() {
  autoPlayButton.textContent = "Stop Auto Play";
  autoPlay = true;
  timerDisplay.textContent = time + "s";
  autoPlayInterval = setInterval(() => {
    time--;
    timerDisplay.textContent = time + "s";
    if (time < 1) {
      time = timer + 1;
      nextSlide();
    }
  }, 1000);
  prevButton.style.display = "none";
  nextButton.style.display = "none";
}

function stopAutoPlay() {
  autoPlayButton.textContent = "Start Auto Play";
  autoPlay = false;
  clearInterval(autoPlayInterval);
  timerDisplay.textContent = "";
  prevButton.style.display = "block";
  nextButton.style.display = "block";
}

function toggleAutoPlay() {
  if (autoPlay) stopAutoPlay();
  else startAutoPlay();
}

prevButton.addEventListener("click", () => prevSlide());
nextButton.addEventListener("click", () => nextSlide());
autoPlayButton.addEventListener("click", () => toggleAutoPlay());

updateCarousel();
