const form = document.querySelector("form");
const inputs = document.querySelectorAll(
 "#nameInput, #emailInput, #passwordInput",
);
const error = document.getElementById("inputError");

form.addEventListener("submit", (e) => {
 e.preventDefault();

 let hasError = false;

 inputs.forEach((input) => {
  input.setCustomValidity("");

  if (!input.value.trim()) {
   hasError = true;
  }
 });

 if (hasError) {
  error.textContent = "All fields are required";
 } else {
  error.textContent = "";
 }
});
