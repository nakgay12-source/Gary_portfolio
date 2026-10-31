/* 공개 화면에서 반복하는 꼬리말입니다. */
customElements.define('p-footer', class extends HTMLElement {
  connectedCallback() { this.innerHTML = '<footer class="site-footer"><div class="container">김낙경 · 물류 포트폴리오</div></footer>'; }
});
