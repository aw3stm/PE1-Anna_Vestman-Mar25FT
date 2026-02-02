import { CONFIG } from "./config.js";

export async function apiRequest(endpoint, options = {}) {
 const token = localStorage.getItem("token");
 const apiKey = localStorage.getItem("apiKey");

 const headers = new Headers(options.headers || {});

 if (!headers.has("Content-Type")) {
  headers.set("Content-Type", "application/json");
 }

 if (token) {
  headers.set("Authorization", `Bearer ${token}`);
 }

 if (apiKey) {
  headers.set("X-Noroff-API-Key", apiKey);
 }

 const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
  ...options,
  headers,
 });

 const text = await response.text();
 const data = text ? JSON.parse(text) : null;

 if (!response.ok) {
  const message =
   data?.errors?.[0]?.message ||
   data?.message ||
   `Request failed (${response.status})`;

  throw new Error(message);
 }

 return data;
}
