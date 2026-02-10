import { apiRequest } from "./client.js";
import { saveAuth } from "./auth.js";

const form = document.getElementById("loginForm");
const error = document.getElementById("errorText");

form.addEventListener("keydown", async (e) => {
 if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
  e.preventDefault();
 }
});

form.addEventListener("submit", async (e) => {
 e.preventDefault();

 const email = document.getElementById("emailInput").value.trim();
 const password = document.getElementById("passwordInput").value.trim();

 try {
  const result = await apiRequest("/auth/login", {
   method: "POST",
   body: JSON.stringify({ email, password }),
  });

  saveAuth(result.data);

  window.location.href = "/index.html";
 } catch (err) {
  error.textContent = err.message;
 }
});
