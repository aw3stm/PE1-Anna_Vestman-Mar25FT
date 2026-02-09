import { formatDate } from "./utils.js";
import { getPosts, deletePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";
import { startInactivitySignout } from "./utils.js";

//Inactivity more than 10 min from admin > Signout
function logout() {
  localStorage.removeItem("token");
  window.location.replace("/account/login.html");
}

if (localStorage.getItem("token")) {
  startInactivitySignout({
    timeout: 10 * 60 * 1000,
    onLogout: logout
  });
}

// GUARD > Check if the person are admin/owner
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

function renderPosts(posts) {
 list.innerHTML = "";

 posts.forEach((post) => {
  const item = document.createElement("div");
  item.classList.add("dashboardPost");

  item.innerHTML = `
<div class="dashboardPostContent">
   <img src="${post.media?.url || ""}" alt="${post.alt}">
     <p class="textInfoBottom">
    ${post.body || ""}
  </p>

  <div class="dashboardActions">

 <button data-id="${post.id}" class="iconBtn editBtn" title="Edit post">
  <img src="/icons/editIconGreen.svg" alt="Edit">
 </button>

 <button data-id="${post.id}" class="iconBtn deleteBtn" title="Delete post">
  <img src="/icons/deleteIconGreen.svg" alt="Delete">
 </button>

</div>

    <div class="postMeta">
  <span>Created: ${formatDate(post.created)}</span>
 </div>
 <p class="authorDashboard">Author: ${post.author.name}</p>
 </div>
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
