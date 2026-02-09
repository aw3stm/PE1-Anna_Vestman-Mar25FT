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
