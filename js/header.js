import { isAdmin, isLoggedIn, logout } from "./auth.js";

class PageHeader extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `

<header class="mainHeader">
 <div class="innerHeader">

  <div class="logo">
   <a href="/index.html">
    <img src="/icons/Mobile Logo.svg" class="logoMobile" alt="FreeTime mobile logo">
   </a>

   <a href="/index.html">
    <img src="/icons/FreeTime_Feed_brown_desktop.svg" class="logoDesktop" alt="FreeTime Feed desktop logo">
   </a>
  </div>

  <div class="rightGroup">
  <nav class="navLinks publicNav">
   <a href="/index.html">Home</a>
   <a href="#">About</a>
   <a href="#">Contact</a>
  </nav>

  <nav class="navLinks adminNav hidden">
  <a href="/">Home</a>
   <a href="/blog/post/dashboard.html">Dashboard</a>
   <a href="/blog/post/create.html">Create Post</a>
   <a href="/blog/post/edit.html">Edit Post</a>
  </nav>

  <div class="headerIcons">

   <a id="loginIcon" href="/account/login.html">
    <img src="/icons/adminIconHeader.png" alt="Sign in">
   </a>

   <a id="logoutIcon" class="hidden">
    <img src="/icons/signout_green.svg" alt="Sign out">
   </a>

   <button id="hamburger" class="hamburgerBtn">
    <img src="/icons/hamburgerIconGreen.svg" class="iconOpen">
    <img src="/icons/closeIconGreen.svg" class="iconClose">
   </button>
</div>
  </div>
 </div>
</header>

<div class="mobileMenu">
 <div class="menuViewer">

  <a href="/" class="menuItem">
   <img src="/icons/homeIcon.png">
   <span>Home</span>
  </a>

  <a href="/account/register.html" class="menuItem">
   <img src="/icons/aboutIcon.png">
   <span>About</span>
  </a>

  <a href="/contact.html" class="menuItem">
   <img src="/icons/emailIcon.png">
   <span>Contact</span>
  </a>

 </div>

 <div id="menuAdmin" class="hidden">

  <a href="/blog/post/dashboard.html" class="menuItem">
   <img src="/icons/dashboardIcon.png">
   <span>Dashboard</span>
  </a>

  <a href="/blog/post/create.html" class="menuItem">
   <img src="/icons/createPost.png">
   <span>Create Post</span>
  </a>

  <a id="logoutBtn" class="menuItem">
   <img src="/icons/signOut.png">
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

  // Mobile toggle
  hamburger.addEventListener("click", () => {
   mobileMenu.classList.toggle("open");
   hamburger.classList.toggle("active");
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

 handleLogout() {
  logout();
  window.location.href = "/";
 }
}

customElements.define("page-header", PageHeader);
