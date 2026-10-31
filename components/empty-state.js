/* 빈 화면과 오류 화면에 다음 이동 경로를 제공합니다. */
customElements.define('p-empty-state', class extends HTMLElement {
  connectedCallback() {
    const { escape, url } = PortfolioUI;
    this.innerHTML = `<div class="empty-state"><h3>${escape(this.getAttribute('heading') || '업무 개선 사례를 준비하고 있습니다.')}</h3><p class="muted">${escape(this.getAttribute('description') || '')}</p>${this.getAttribute('href') ? `<a class="button button--secondary" href="${escape(url(this.getAttribute('href')))}">${escape(this.getAttribute('action-label') || '홈으로')}</a>` : ''}</div>`;
  }
});
