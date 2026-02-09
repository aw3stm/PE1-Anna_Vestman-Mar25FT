import { createPost } from "./posts.js";
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
  onLogout: logout,
 });
}

// ROUTE GUARD
if (!isLoggedIn() || !isAdmin()) {
 window.location.replace("/account/login.html");
}

const form = document.getElementById("createPostForm");

if (!form) {
 throw new Error("Create form not found");
}

const imageInput = document.getElementById("imageInput");
const altInput = document.getElementById("altInput");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

const prevImg = document.getElementById("prevImg");
const prevAlt = document.getElementById("prevAlt");
const prevTitle = document.getElementById("prevTitle");
const prevBody = document.getElementById("prevBody");

imageInput.addEventListener("input", () => {
 prevImg.src = imageInput.value.trim() || "/images/placeholder.jpg";
});

altInput.addEventListener("input", () => {
 if (prevAlt) {
  prevAlt.textContent = altInput.value;
 }
});

titleInput.addEventListener("input", () => {
 prevTitle.textContent = titleInput.value || "Title shows here";
});

contentInput.addEventListener("input", () => {
 prevBody.textContent = contentInput.value || "Body text here";
});

const fields = [
 { el: titleInput, key: "title_draft" },
 { el: authorInput, key: "author_draft" },
 { el: contentInput, key: "content_draft" },
 { el: imageInput, key: "image_draft" },
 { el: altInput, key: "alt_draft" },
];

//Save at input
fields.forEach(({ el, key }) => {
 el.addEventListener("input", () => {
  localStorage.setItem(key, el.value);
 });
});

// Reset at reload
window.addEventListener("DOMContentLoaded", () => {
 fields.forEach(({ el, key }) => {
  const saved = localStorage.getItem(key);
  if (saved) {
   el.value = saved;
   el.dispatchEvent(new Event("input"));
  }
 });
});

form.addEventListener("submit", async (e) => {
 e.preventDefault();

 const title = titleInput.value.trim();
 const content = contentInput.value.trim();
 const image = imageInput.value.trim();
 const alt = altInput.value.trim();

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

  await createPost(postData);
  localStorage.removeItem("title_draft");
  localStorage.removeItem("author_draft");
  localStorage.removeItem("content_draft");
  localStorage.removeItem("image_draft");
  localStorage.removeItem("alt_draft");

  window.location.href = "./index.html";
 } catch (error) {
  console.error("CREATE ERROR:", error.message);
  alert(error.message);
 } finally {
  submitBtn.disabled = false;
  submitBtn.textContent = "Publish";
 }
});
