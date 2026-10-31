/* 오류는 즉시 알리고, 일반 안내는 읽는 흐름을 방해하지 않습니다. */
customElements.define('p-alert', class extends HTMLElement {
  connectedCallback() {
    const tone = ['error', 'success', 'warning', 'info'].includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'info';
    this.classList.add('alert', `alert--${tone}`);
    this.setAttribute('role', tone === 'error' ? 'alert' : 'status');
    this.setAttribute('aria-atomic', 'true');
  }
});
