import { getPosts } from "./posts.js";
import { initCarousel } from "./carousel.js";

const carousel = document.getElementById("carouselItems");
const grid = document.getElementById("gridContainer");

async function loadFeed() {
 try {
  const result = await getPosts(15);
  renderFeed(result.data);
 } catch (error) {}
}

function formatDate(dateString) {
 const date = new Date(dateString);

 return date.toLocaleDateString("sv-SE", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 });
}

function renderFeed(posts) {
 if (!carousel || !grid) {
  return;
 }
 carousel.innerHTML = "";
 grid.innerHTML = "";

 // CAROUSEL 3 latest posts
 posts.slice(0, 3).forEach((post) => {
  carousel.innerHTML += `
   <article class="cardWrapper">
    <div class="cardContent">
     <img src="${post.media?.url || "/images/placeholder.jpg"}" alt="${post.alt}">
     
     <div class="cardOverlay">
      <h1>${post.title}</h1>

      <button id="imageBadge">
       ${post.category || "Read Post"}
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

     <div class="postMeta">
  <span>Created: ${formatDate(post.created)}</span>
  ${
   post.updated !== post.created ?
    `<span>Updated: ${formatDate(post.updated)}</span>`
   : ""
  }
  <span>Author: ${post.author.name}</span>
  </div>
    </div>
   </article>
  `;
 });

 posts.slice(3, 15).forEach((post) => {
  const imageUrl = post.media?.url || "/images/placeholder.jpg";
  const text = post.body?.slice(0, 120) || "";

  grid.innerHTML += `
  <article class="gridWrapper">
   <div class="cardContent gridContent">
    <img 
     src="${imageUrl}" 
     alt="${post.alt || ""}" />

    <div class="cardOverlay"></div>
   </div>

   <div class="gridText">
    <h2 class="cardGridH2">
     ${post.title}
    </h2>

    <p class="textInfoBottom">
     ${text}
    </p>
   </div>
  </article>
 `;
 });
 initCarousel();
}

loadFeed();
