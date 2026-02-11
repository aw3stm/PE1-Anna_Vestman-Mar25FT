const breadcrumb_map = {
 blog: null,
 post: null,

 "dashboard.html": {
  label: "Dashboard",
  href: "/blog/post/dashboard.html",
 },
 "create.html": {
  label: "Create Post",
  href: "/blog/post/create.html",
 },
 "edit.html": {
  label: "Edit Post",
  href: "/blog/post/edit.html",
 },
 "blog/post/index.html": {
  label: "Blog Post",
  href: "/blog/post/index.html",
 },
};

export function initBreadcrumb() {
 const wrapper = document.getElementById("breadcrumb");
 if (!wrapper) return;

 const path = window.location.pathname.split("/").filter(Boolean);

 let accumulatedPath = "";

 wrapper.innerHTML = "";
 wrapper.innerHTML += `<li><a href="/">Home</a></li>`;

 path.forEach((segment, index) => {
  const config = breadcrumb_map[segment];
  if (config === null) return;
  if (!config) return;

  wrapper.innerHTML += `
<li>
    ${
     config.href ?
      `<a href="${config.href}">${config.label}</a>`
     : `<span>${config.label}</span>`
    }
    </li>
    `;
 });
}
