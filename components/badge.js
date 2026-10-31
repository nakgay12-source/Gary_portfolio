/* 상태는 색상뿐 아니라 글자로도 전달합니다. */
customElements.define('p-badge', class extends HTMLElement {
  connectedCallback() {
    const tone = this.getAttribute('tone');
    this.classList.add('badge', `badge--${['success', 'warning', 'info'].includes(tone) ? tone : 'neutral'}`);
  }
});
