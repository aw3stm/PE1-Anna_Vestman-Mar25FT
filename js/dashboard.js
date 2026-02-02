import { getPosts, deletePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";

// GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.href = "/account/login.html";
}

const list = document.getElementById("blogList");

async function loadDashboard() {
 try {
  const result = await getPosts(100);
  renderPosts(result.data);
 } catch (error) {
  console.error(error.message);
 }
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

function renderPosts(posts) {
 list.innerHTML = "";

 posts.forEach((post) => {
  const item = document.createElement("div");
  item.classList.add("dashboardPost");

  item.innerHTML = `

   <img src="${post.media?.url || ""}" alt="${post.alt}">
     <p class="textInfoBottom">
    ${post.body || ""}
  </p>

   <div class="dashboardActions">
     <button data-id="${post.id}" class="btn deleteBtn">Delete</button>
    <button data-id="${post.id}" class="btn editBtn">Edit</button>
   </div>
    <div class="postMeta">
  <span>Created: ${formatDate(post.created)}</span>

  ${
   post.updated !== post.created
    ? `<span>Updated: ${formatDate(post.updated)}</span>`
    : ""
  }
 </div>
 <p class="authorDashboard">Author: ${post.author.name}</p>
  `;

  list.appendChild(item);
 });

 attachDeleteEvents();
 attachEditEvents();
}

function attachDeleteEvents() {
 const buttons = document.querySelectorAll(".deleteBtn");

 buttons.forEach((btn) => {
  btn.addEventListener("click", async () => {
   const id = btn.dataset.id;

   const confirmDelete = confirm("Delete this post?");

   if (!confirmDelete) return;

   try {
    await deletePost(id);
    loadDashboard();
   } catch (error) {
    alert(error.message);
   }
  });
 });
}

function attachEditEvents() {
 const buttons = document.querySelectorAll(".editBtn");

 buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
   const id = btn.dataset.id;

   window.location.href = `/blog/post/edit.html?id=${id}`;
  });
 });
}

loadDashboard();
