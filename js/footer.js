import { BASE_PATH } from "./config.js";

class pageFooter extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `
 
    <footer class="footerWrapper">
    <div class="footerDivider"></div>
    <div class="footerContent">
        <div class="footerTopText">
        <div class="footerLogo">
        <img src="${BASE_PATH}/icons/FreeTimeFeed_text_logo.svg" alt="FreeTime Feed main logo">
    </div>
    <div class="footerSlogan">
        <p>Built for curious minds.</p>
        <p>Scroll less. <span class="liveMore">Live more.</span></p>
    </div>
    </div>

    <div class="footerLinks">
        <a href="${BASE_PATH}/index.html">Home</a>
        <a href="${BASE_PATH}/index.html">About</a>
        <a href="${BASE_PATH}/index.html">Contact</a>
        </div>

    <div class="footerSocialIcons">
        <img src="${BASE_PATH}/icons/YT Icon.svg" alt="Green Youtube logo">
        <img src="${BASE_PATH}/icons/TikTok Icon.svg" alt="Green TikTok logo">
        <img src="${BASE_PATH}/icons/Instagram Icon.svg" alt="Green Instagram logo">
        <img src="${BASE_PATH}/icons/Discord Icon.svg" alt="Green Discord logo">
        </div>

    <div class="footerPolicy">
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
    </div>
    <p class="footerCopy">&copy; 2026 FreeTime Feed. All rights reserved.</p>
    </div>
    </div>
</footer>

    `;
 }
}

customElements.define("page-footer", pageFooter);
