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
