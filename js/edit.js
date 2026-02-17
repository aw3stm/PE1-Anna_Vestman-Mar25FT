import { getPostById, updatePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";
import { startInactivitySignout, initPostPrev } from "./utils.js";
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

// ROUTE GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.replace(`${BASE_PATH}/account/login.html`);
}

// URL PARAM
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

// DOM ELEMENTS
const form = document.getElementById("editPostForm");
const titleInput = document.getElementById("titleInput");
const authorDisplay = document.getElementById("authorDisplay");
const contentInput = document.getElementById("contentInput");
const imageInput = document.getElementById("imageInput");
const altInput = document.getElementById("altInput");

if (!form) {
 throw new Error("Edit form not found");
}

function disableForm() {
 const inputs = form.querySelectorAll("input, textarea, button");
 inputs.forEach((el) => {
  el.disabled = true;
 });
}

if (!postId) {
 disableForm();
}

// LOAD POST
async function loadPost() {
 if (!postId) return;

 try {
  const result = await getPostById(postId);
  const post = result.data;

  titleInput.value = post.title || "";
  authorDisplay.textContent = post.author?.name || "Unknown";
  contentInput.value = post.body || "";
  imageInput.value = post.media?.url || "";
  altInput.value = post.media?.alt || "";
 } catch (error) {
  console.error(error.message);
  alert("Could not load post");
 }
}

document.addEventListener("DOMContentLoaded", async () => {
 await loadPost();
 initPostPrev({
  titleInput,
  contentInput,
  imageInput,
  altInput,
  prevTitle: document.getElementById("prevTitle"),
  prevBody: document.getElementById("prevBody"),
  prevImg: document.getElementById("prevImg"),
  prevAlt: document.getElementById("prevAlt"),
 });
});

// UPDATE POST
form.addEventListener("submit", async (e) => {
 e.preventDefault();

 const updatedData = {
  title: titleInput.value.trim(),
  body: contentInput.value.trim(),
  media: {
   url: imageInput.value.trim(),
   alt: altInput.value.trim(),
  },
 };

 try {
  await updatePost(postId, updatedData);
  window.location.href = `${BASE_PATH}/blog/post/dashboard.html`;
 } catch (error) {
  console.error(error.message);
  alert("Update failed");
 }
});
