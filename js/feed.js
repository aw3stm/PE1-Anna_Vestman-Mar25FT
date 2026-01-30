import { getPosts } from "./posts.js";

const carousel = document.getElementById("carouselItems");
const grid = document.getElementById("gridContainer");

async function loadFeed() {
 try {
  const result = await getPosts(15);
  renderFeed(result.data);
 } catch (error) {
  console.error(error.message);
 }
}

function renderFeed(posts) {
 carousel.innerHTML = "";
 grid.innerHTML = "";

 // CAROUSEL 3 latest posts
 posts.slice(0, 3).forEach((post) => {
  carousel.innerHTML += `
   <article class="cardWrapper">
    <div class="cardContent">
     <img src="${post.media?.url || ""}" alt="${post.alt}">
     
     <div class="cardOverlay">
      <h1>${post.title}</h1>

      <button id="imageBadge">
       ${post.category || "Activity"}
      </button>

      <button class="navBtn left">
       <img src="/icons/chevronLeft.svg" alt="">
      </button>

      <button class="navBtn right">
       <img src="/icons/chevronRight.svg" alt="">
      </button>
     </div>
    </div>

    <div class="cardText">
     <div class="minRead">
      <img src="/icons/clockReadingMin.svg" alt="">
      <p>${post.readTime || 5} minutes read</p>
     </div>

     <p class="textInfoBottom">
      ${post.body || ""}
     </p>
    </div>
   </article>
  `;
 });

 posts.slice(3, 15).forEach((post) => {
  const imageUrl = post.media?.url || "/images/Robotic.jpg";
  const text = post.body?.slice(0, 120) || "";

  grid.innerHTML += `
  <article class="gridWrapper">
   <div class="cardContent gridContent">
    <img 
     src="${post.media?.url || ""}" 
     alt="${post.alt}" />

    <div class="cardOverlay"></div>
   </div>

   <div class="gridText">
    <h2 class="cardGridH2">
     ${post.title}
    </h2>

    <p class="textInfoBottom">
     ${post.body || ""}
    </p>
   </div>
  </article>
 `;
 });
}

loadFeed();
