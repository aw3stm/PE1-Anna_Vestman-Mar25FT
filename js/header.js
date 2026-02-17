import { isAdmin, isLoggedIn, logout } from "./auth.js";
import { initBreadcrumb } from "./breadcrumb.js";
import { BASE_PATH } from "./config.js";

document.addEventListener("DOMContentLoaded", initBreadcrumb);

class PageHeader extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `

<header class="mainHeader">
 <div class="innerHeader">

  <div class="logo">
   <a href="${BASE_PATH}/index.html">
    <img src="${BASE_PATH}/icons/Mobile Logo.svg" class="logoMobile" alt="FreeTime mobile logo">
   </a>

   <a href="${BASE_PATH}/index.html">
    <img src="${BASE_PATH}/icons/FreeTime_Feed_brown_desktop.svg" class="logoDesktop" alt="FreeTime Feed desktop logo">
   </a>
  </div>

  <div class="rightGroup">
  <nav class="navLinks publicNav">
   <a href="${BASE_PATH}/index.html">Home</a>
   <a href="#">About</a>
   <a href="#">Contact</a>
  </nav>

  <nav class="navLinks adminNav hidden">
  <a href="${BASE_PATH}/index.html">Home</a>
   <a href="${BASE_PATH}/blog/post/dashboard.html">Dashboard</a>
   <a href="${BASE_PATH}/blog/post/create.html">Create Post</a>
   <a href="${BASE_PATH}/blog/post/edit.html">Edit Post</a>
  </nav>

  <div class="headerIcons">

   <a id="loginIcon" href="${BASE_PATH}/account/login.html">
    <img src="${BASE_PATH}/icons/adminIconHeader.png" alt="Sign in">
   </a>

   <a id="logoutIcon" class="hidden">
    <img src="${BASE_PATH}/icons/signout_green.svg" alt="Sign out">
   </a>

   <button id="hamburger" class="hamburgerBtn">
    <img src="${BASE_PATH}/icons/hamburgerIconGreen.svg" class="iconOpen">
    <img src="${BASE_PATH}/icons/closeIconGreen.svg" class="iconClose">
   </button>
</div>
  </div>
 </div>
</header>

<div class="mobileMenu">
 <div class="menuViewer">

  <a href="${BASE_PATH}/index.html" class="menuItem">
   <img src="${BASE_PATH}/icons/homeIcon.png">
   <span>Home</span>
  </a>

  <a href="${BASE_PATH}/index.html" class="menuItem">
   <img src="${BASE_PATH}/icons/aboutIcon.png">
   <span>About</span>
  </a>

  <a href="${BASE_PATH}/index.html" class="menuItem">
   <img src="${BASE_PATH}/icons/emailIcon.png">
   <span>Contact</span>
  </a>

 </div>

 <div id="menuAdmin" class="hidden">

  <a href="${BASE_PATH}/blog/post/dashboard.html" class="menuItem">
   <img src="${BASE_PATH}/icons/dashboardIcon.png">
   <span>Dashboard</span>
  </a>

  <a href="${BASE_PATH}/blog/post/create.html" class="menuItem">
   <img src="${BASE_PATH}/icons/createPost.png">
   <span>Create Post</span>
  </a>

  <a id="logoutBtn" class="menuItem">
   <img src="${BASE_PATH}/icons/signOut.png">
   <span>Sign out</span>
  </a>

 </div>

</div>
`;
  this.init();
 }

 init() {
  const hamburger = this.querySelector("#hamburger");
  const mobileMenu = this.querySelector(".mobileMenu");

  const publicNav = this.querySelector(".publicNav");
  const adminNav = this.querySelector(".adminNav");

  const loginIcon = this.querySelector("#loginIcon");
  const logoutIcon = this.querySelector("#logoutIcon");

  const adminMenu = this.querySelector("#menuAdmin");
  const logoutBtn = this.querySelector("#logoutBtn");

  // Render auth UI
  this.renderAuthState(publicNav, adminNav, loginIcon, logoutIcon, adminMenu);
  this.setActiveLink();

  // Mobile toggle
  hamburger.addEventListener("click", () => {
   mobileMenu.classList.toggle("open");
   hamburger.classList.toggle("active");
   document.body.classList.toggle("menu-open");
  });

  // Logout (desktop + mobile)
  logoutIcon?.addEventListener("click", this.handleLogout);
  logoutBtn?.addEventListener("click", this.handleLogout);
 }

 renderAuthState(publicNav, adminNav, loginIcon, logoutIcon, adminMenu) {
  // DEFAULT PUBLIC STATE

  publicNav.classList.remove("hidden");
  adminNav.classList.add("hidden");

  loginIcon.classList.remove("hidden");
  logoutIcon.classList.add("hidden");

  adminMenu.classList.add("hidden");

  // ADMIN STATE

  if (isLoggedIn() && isAdmin()) {
   publicNav.classList.add("hidden");
   adminNav.classList.remove("hidden");

   loginIcon.classList.add("hidden");
   logoutIcon.classList.remove("hidden");

   adminMenu.classList.remove("hidden");
  }
 }
 setActiveLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  const links = this.querySelectorAll(".navLinks:not(.hidden) a");

  links.forEach((link) => {
   if (!link.href || link.getAttribute("href") === "#") return;

   const linkPath = new URL(link.href).pathname.replace(/\/$/, "");

   if (linkPath === currentPath) {
    link.classList.add("active");
   } else {
    link.classList.remove("active");
   }
  });
 }

 handleLogout() {
  logout();
  window.location.href = `${BASE_PATH}/index.html`;
 }
}

customElements.define("page-header", PageHeader);
