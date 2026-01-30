import { CONFIG } from "./config.js";
import { apiRequest } from "./client.js";

export function getPosts(limit = 12) {
 return apiRequest(`/blog/posts/${CONFIG.BLOG_NAME}?limit=${limit}`);
}

export function getPostById(id) {
 return apiRequest(`/blog/posts/${CONFIG.BLOG_NAME}/${id}`);
}

export function createPost(data) {
 return apiRequest(`/blog/posts/${CONFIG.BLOG_NAME}`, {
  method: "POST",
  body: JSON.stringify(data),
 });
}

export function deletePost(id) {
 return apiRequest(`/blog/posts/${CONFIG.BLOG_NAME}/${id}`, {
  method: "DELETE",
 });
}
