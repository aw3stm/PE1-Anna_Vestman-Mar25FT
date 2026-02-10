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
  dots[index]?.classList.add("active");
 }

 function nextPage() {
  index = (index + 1) % slides.length;
  updateCarousel();
 }

 function prevPage() {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
 }

 const intervalTime = 5000;
 let autoPlay = setInterval(nextPage, intervalTime);

 function resetAutoplay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextPage, intervalTime);
 }

 track.addEventListener("mouseenter", () => clearInterval(autoPlay));
 track.addEventListener("mouseleave", resetAutoplay);

 nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
   nextPage();
   resetAutoplay();
  });
 });

 prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
   prevPage();
   resetAutoplay();
  });
 });

 updateCarousel();
}
