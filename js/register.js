import { apiRequest } from "./client.js";

const form = document.getElementById("registerForm");
const error = document.getElementById("errorText");

form.addEventListener("submit", async (e) => {
 e.preventDefault();

 const name = document.getElementById("nameInput").value.trim();
 const email = document.getElementById("emailInput").value.trim();
 const password = document.getElementById("passwordInput").value.trim();

 if (!name || !email || !password) {
  error.textContent = "All fields are required";
  return;
 }

 try {
  await apiRequest("/auth/register", {
   method: "POST",
   body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
   throw new Error(data.errors?.[0]?.message || "Registration failed");
  }

  // success → redirect to login
  window.location.href = "/account/login.html";
 } catch (err) {
  error.textContent = err.message;
  if (err.message.includes("exists")) {
   error.textContent = "Account already exists.";
  }
 }
});
