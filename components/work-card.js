/* 카드 전체를 하나의 링크로 구성하며 이미지는 선택 사항입니다. */
customElements.define('p-work-card', class extends HTMLElement {
  connectedCallback() {
    const { escape, url } = PortfolioUI;
    const title = this.getAttribute('heading') || '업무 개선 사례';
    const src = this.getAttribute('image');
    this.innerHTML = `<a class="work-card" href="${escape(url(this.getAttribute('href') || '#'))}" aria-label="${escape(title)} 사례 자세히 보기">
      ${src ? `<img class="work-card-image ${this.hasAttribute('diagram') ? 'work-card-image--diagram' : ''}" src="${escape(url(src))}" alt="${escape(this.getAttribute('alt') || '')}" loading="lazy">` : ''}
      <div class="work-card-body">
      ${this.hasAttribute('example') ? '<span class="badge badge--info">예시</span>' : ''}
      ${this.getAttribute('period') ? `<span class="muted small">${escape(this.getAttribute('period'))}</span>` : ''}
      <h3>${escape(title)}</h3><p>${escape(this.getAttribute('summary') || '')}</p>
      <span class="work-card-link">사례 자세히 보기 <span aria-hidden="true">→</span></span></div></a>`;
  }
});
