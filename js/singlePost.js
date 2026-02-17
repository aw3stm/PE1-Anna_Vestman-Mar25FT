import { formatDate } from "./utils.js";
import { getPostById } from "./posts.js";
import { BASE_PATH } from "./config.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
 window.location.href = `${BASE_PATH}/index.html`;
}

async function loadPost() {
 const result = await getPostById(postId);
 const post = result.data;

 document.getElementById("postTitle").textContent = post.title;
 document.getElementById("postContent").textContent = post.body;
 document.getElementById("postImage").src = post.media?.url || "";
 document.getElementById("postAuthor").textContent = post.author.name;
 postDate.textContent = formatDate(post.created);
}

loadPost();

document.getElementById("sharePostBtn").addEventListener("click", async () => {
 const url = window.location.href;

 if (navigator.share) {
  await navigator.share({
   title: document.title,
   url: url,
  });
 } else {
  await navigator.clipboard.writeText(url);
  showToast("Link copied");
 }
 function showToast(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 1800);
 }
});
