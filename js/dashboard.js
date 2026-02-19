import { formatDate, startInactivitySignout } from "./utils.js";
import { getPosts, deletePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";
import { BASE_PATH } from "./config.js";

//Inactivity more than 10 min from admin > Signout
function logout() {
 localStorage.removeItem("token");
 window.location.replace(`${BASE_PATH}/account/login.html`);
}

if (localStorage.getItem("token")) {
 startInactivitySignout({
  timeout: 10 * 60 * 1000,
  onLogout: logout,
 });
}

// GUARD > Check if the person are admin/owner
if (!isLoggedIn() || !isAdmin()) {
 window.location.href = `${BASE_PATH}/account/login.html`;
}

//Edit or delete blog post

const list = document.getElementById("blogList");

const deleteEvent = document.getElementById("deletePost");
const confirmBtn = document.getElementById("confirmDelete");
const cancelBtn = document.getElementById("cancelDelete");

let postToDelete = null;

list.addEventListener("click", async (e) => {
 const editBtn = e.target.closest(".editBtn");
 const deleteBtn = e.target.closest(".deleteBtn");
 const postImg = e.target.closest(".postImg");

 if (editBtn) {
  e.stopPropagation();
  const id = editBtn.dataset.id;
  window.location.href = `${BASE_PATH}/blog/post/edit.html?id=${id}`;
  return;
 }

 if (deleteBtn) {
  e.stopPropagation();
  postToDelete = deleteBtn.dataset.id;
  deleteEvent.classList.remove("hidden");
  return;
 }
 if (postImg) {
  const post = postImg.closest(".dashboardPost");
  const id = post.dataset.id;
  window.location.href = `${BASE_PATH}/blog/post/index.html?id=${id}`;
 }
});

cancelBtn.addEventListener("click", () => {
 deleteEvent.classList.add("hidden");
 postToDelete = null;
});

confirmBtn.addEventListener("click", async () => {
 if (!postToDelete) return;
 try {
  await deletePost(postToDelete);
  await loadDashboard();
 } catch (error) {
  console.error(error.message);
 }
 deleteEvent.classList.add("hidden");
 postToDelete = null;
});

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
  item.dataset.id = post.id;

  item.innerHTML = `
<div class="dashboardPostContent">
   <img class="postImg" src="${post.media?.url || ""}" alt="${post.alt}">
     <p class="textInfoBottom">
    ${post.body || ""}
  </p>

  <div class="dashboardActions">

 <button data-id="${post.id}" class="iconBtn editBtn" title="Edit post">
  <img src="${BASE_PATH}/icons/editIconGreen.svg" alt="Edit">
 </button>

 <button data-id="${post.id}" class="iconBtn deleteBtn" title="Delete post">
  <img src="${BASE_PATH}/icons/deleteIconGreen.svg" alt="Delete">
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
}

loadDashboard();
