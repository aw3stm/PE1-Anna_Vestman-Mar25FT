class PageHeader extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `

<header class="mainHeader">

  <div class="logo">
    <img src="/icons/Mobile Logo.svg">
  </div>

  <nav class="navLinks">
    <a href="/index.html">Home</a>
    <a href="/posts.html">Latest Posts</a>
    <a href="/about.html">About</a>
    <a href="/contact.html">Contact</a>
  </nav>

  <div class="headerIcons">
    <div class="searchHeader">
  <img src="/icons/searchIcon.png" alt="Search icon"></div>

 <button id="hamburger" class="hamburgerBtn">

  <img 
    src="/icons/hamburgerIcon.png" 
    class="iconOpen">

  <img 
    src="/icons/hamburgerClose.png" 
    class="iconClose">

</button>

</div>

  <!-- MOBILE MENU -->

  <div class="mobileMenu">
    <div class="menuViewer">
      <a href="/">Home</a>
      <a href="/posts.html">Latest Posts</a>
      <a href="/about.html">About</a>
      <a href="/contact.html">Contact</a>
    </div>

    <div class="menuAdmin hidden">
      <hr>
      <a href="/admin/dashboard.html">Dashboard</a>
      <a href="/admin/create.html">Create Post</a>
      <a href="#" id="logoutBtn">Sign Out</a>
    </div>

  </div>

</header>

    `;

  this.init();
 }

 init() {
  const hamburger = this.querySelector("#hamburger");
  const mobileMenu = this.querySelector(".mobileMenu");
  const adminMenu = this.querySelector(".menuAdmin");
  const logoutBtn = this.querySelector("#logoutBtn");

  const token = localStorage.getItem("token");

  // auth UI
  if (token) {
   adminMenu.classList.remove("hidden");
  }

  // hamburger
  hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("active");
  });

  // logout
  if (logoutBtn) {
   logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
   });
  }
 }
}

customElements.define("page-header", PageHeader);
