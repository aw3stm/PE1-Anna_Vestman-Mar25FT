class PageHeader extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `

<header class="mainHeader">
  <div class="innerHeader">
    <div class="logo">
     <a href="/index.html">
    <img src="/icons/Mobile Logo.svg"
    class="logoMobile"
    alt="FreeTime mobile logo"></a>

  <img src="/icons/FreeTime_Feed_brown_desktop.svg" 
    class="logoDesktop"
    alt="FreeTime Feed desktop logo">
  </div>

  <nav class="navLinks">
    <a href="/index.html">Home</a>
    <a href="/posts.html">Latest Posts</a>
    <a href="/about.html">About</a>
    <a href="/contact.html">Contact</a>
  </nav>

  <div class="headerIcons">
      <img class="searchIconHeader"src="/icons/searchIconHeader.svg" alt="Search icon">
      <img class="adminDeskHeader" src="/icons/adminIconHeader.png" alt="Sign in logo">
 <button id="hamburger" class="hamburgerBtn">

  <img src="/icons/hamburgerIconGreen.svg" class="iconOpen">
        <img src="/icons/closeIconGreen.svg" class="iconClose">
      </button>
    </div>
</header>


  <!---------- MOBILE MENU ------------>

  <div class="mobileMenu">
    <div class="menuViewer">

      <a href="/" class="menuItem">
      <img src="/icons/homeIcon.png" alt="House icon">
      <span>Home</span>
      </a>

      <a href="#" class="menuItem">
      <img src="/icons/chatIcon.png" alt="Chat icon">
      <span>Latest Posts</span>
      </a>

      <a href="#" class="menuItem">
      <img src="/icons/aboutIcon.png" alt="Info icon">
      <span>About</span>
      </a>

      <a href="#" class="menuItem">
      <img src="/icons/emailIcon.png" alt="Contact icon">
      <span>Contact</span>
      </a>

    </div>

    <div class="menuAdmin hidden">
     <a href="/account/login.html" class="menuItem">
      <img src="/icons/adminIcon.png" alt="Login icon">
      <span>Admin login</span>
      </a>

     <!-- TOGGLE OFF ATM.
     
     <a href="#" class="menuItem">
      <img src="/icons/dashboardIcon.png" alt="Dashboard icon">
      <span>Dashboard</span>
      </a>

      <a href="#" class="menuItem">
      <img src="/icons/createPost.png" alt="Create post icon">
      <span>Create Post</span>
      </a>
    
      <a href="#" class="menuItem">
      <img src="/icons/signOut.png" alt="Sign out icon">
      <span>Sign out</span>
      </a> -->
    </div>

  </div>



    `;

  this.init();
 }

 init() {
  // const DEV_SIDEBAR_OPEN = true;
  const hamburger = this.querySelector("#hamburger");
  const mobileMenu = this.querySelector(".mobileMenu");
  const adminMenu = this.querySelector(".menuAdmin");
  const logoutBtn = this.querySelector("#logoutBtn");

  const token = localStorage.getItem("token");

  // auth UI
  if (token) {
   adminMenu.classList.remove("hidden");
  }

  // // DEV MODE
  // if (DEV_SIDEBAR_OPEN) {
  //  mobileMenu.classList.add("open");
  //  hamburger.classList.add("active");
  // }

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
