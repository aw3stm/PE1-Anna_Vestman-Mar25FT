import { getPostById, updatePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";

// ROUTE GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.replace("/account/login.html");
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

document.addEventListener("DOMContentLoaded", loadPost);

// UPDATE POST
form.addEventListener("submit", async (e) => {
 e.preventDefault();

 if (!post) {
  alert("No post selected to edit");
  return;
 }

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
  window.location.href = "/blog/post/dashboard.html";
 } catch (error) {
  console.error(error.message);
  alert("Update failed");
 }
});
