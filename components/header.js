/* 공개 화면에서 반복하는 머리말입니다. */
customElements.define('p-header', class extends HTMLElement {
  connectedCallback() {
    const { escape, url } = PortfolioUI;
    const home = escape(url(this.getAttribute('home-href') || './index.html'));
    const works = escape(url(this.getAttribute('works-href') || '#works'));
    this.innerHTML = `<header class="site-header"><div class="container header-inner"><a class="brand" href="${home}">김낙경</a><nav aria-label="주 메뉴"><a href="${home}#about">소개</a><a href="${works}">작업물</a></nav></div></header>`;
  }
});
