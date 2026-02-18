export function formatDate(dateString) {
 const date = new Date(dateString);

 return date.toLocaleDateString("sv-SE", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 });
}

//When user is inactive - logout after 10 minutes

const TIMEOUT_LIMIT = 10 * 60 * 1000;

export function startInactivitySignout({
 timeout = TIMEOUT_LIMIT,
 onLogout,
 events = ["click", "mousemove", "keydown", "scroll", "touchstart"],
} = {}) {
 let inactivityTimer;
 function resetTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(onLogout, timeout);
 }

 events.forEach((event) => window.addEventListener(event, resetTimer, true));
 resetTimer();
 return () => {
  clearTimeout(inactivityTimer);
  events.forEach((event) =>
   window.removeEventListener(event, resetTimer, true),
  );
 };
}

//Preview window for edit and create page
export function initPostPrev({
 titleInput,
 contentInput,
 imageInput,
 altInput,
 prevTitle,
 prevBody,
 prevImg,
 prevAlt,
}) {
 function updatePrev() {
  if (prevTitle) {
   prevTitle.textContent = titleInput.value || "This is your title";
  }
  if (prevBody) {
   prevBody.textContent = contentInput.value || "Body text here";
  }
  if (prevImg) {
   prevImg.src = imageInput.value.trim() || "images/placeholder.jpg";
  }
  if (prevAlt) {
   prevAlt.textContent = altInput.value || "";
  }
 }
 [titleInput, contentInput, imageInput, altInput].forEach((input) => {
  if (input) {
   input.addEventListener("input", updatePrev);
  }
 });
 updatePrev();
}
