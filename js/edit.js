import { getPostById, updatePost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";

// ROUTE GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.replace("/account/login.html");
}

// URL PARAM
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
 throw new Error("No post ID provided");
}

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

// LOAD POST
async function loadPost() {
 try {
  const result = await getPostById(postId);
  const post = result.data;

  titleInput.value = post.title || "";
  authorDisplay.textContent = post.author.name;
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
