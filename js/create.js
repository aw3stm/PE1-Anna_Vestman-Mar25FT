import { createPost } from "./posts.js";
import { isAdmin, isLoggedIn } from "./auth.js";

// ROUTE GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.href = "/account/login.html";
 return;
}

const form = document.getElementById("createPostForm");

form.addEventListener("submit", async (e) => {
 e.preventDefault();

 const title = document.getElementById("titleInput").value.trim();
 const content = document.getElementById("contentInput").value.trim();
 const image = document.getElementById("imageInput").value.trim();
 const alt = document.getElementById("altInput").value.trim();

 if (!title || !content) {
  alert("Title and content are required");
  return;
 }

 const postData = {
  title,
  body: content,
  tags: ["test"],
  media: {
   url: image,
   alt: alt,
  },
 };

 const submitBtn = form.querySelector('button[type="submit"]');

 try {
  submitBtn.disabled = true;
  submitBtn.textContent = "Publishing...";

  const result = await createPost(postData);

  window.location.href = "/index.html";
 } catch (error) {
  console.error("CREATE ERROR:", error.message);
  alert(error.message);
 } finally {
  submitBtn.disabled = false;
  submitBtn.textContent = "Publish";
 }
});
