import { formatDate } from "./utils.js";
import { getPostById } from "./posts.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

if (!postId) {
 window.location.href = "/";
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
