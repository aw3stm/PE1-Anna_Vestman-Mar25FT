export function initCarousel() {
 const track = document.querySelector(".carouselContent");
 const slides = document.querySelectorAll(".cardWrapper");
 const nextBtns = document.querySelectorAll(".navBtn.right");
 const prevBtns = document.querySelectorAll(".navBtn.left");
 const dots = document.querySelectorAll(".dot");

 let index = 0;

 if (!track || slides.length === 0) {
  return;
 }

 function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
 }
 function updateDots() {
  if (!dots.length) return;

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[index]) {
   dots[index].classList.add("active");
  }
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

 updateCarousel();
}
