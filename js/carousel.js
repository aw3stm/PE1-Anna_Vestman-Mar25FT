const track = document.querySelector(".carouselContent");
const slides = document.querySelectorAll(".cardWrapper");

const nextBtns = document.querySelectorAll(".navBtn.right");
const prevBtns = document.querySelectorAll(".navBtn.left");

let index = 0;

function updateCarousel() {
 track.style.transform = `translateX(-${index * 100}%)`;
 updateDots();
}

nextBtns.forEach((btn) => {
 btn.addEventListener("click", () => {
  index++;

  if (index >= slides.length) {
   index = 0;
  }

  updateCarousel();
 });
});

prevBtns.forEach((btn) => {
 btn.addEventListener("click", () => {
  index--;

  if (index < 0) {
   index = slides.length - 1;
  }

  updateCarousel();
 });
});

const dots = document.querySelectorAll(".dot");

function updateDots() {
 dots.forEach((dot) => dot.classList.remove("active"));
 dots[index].classList.add("active");
}

updateCarousel();
