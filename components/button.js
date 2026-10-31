/* href가 있으면 이동 링크, 없으면 동작 버튼을 만듭니다. */
customElements.define('p-button', class extends HTMLElement {
  connectedCallback() {
    if (this.firstElementChild) return;
    const { escape, url } = PortfolioUI;
    const label = this.textContent.trim();
    const variant = ['primary', 'secondary', 'text'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'primary';
    const size = ['small', 'large'].includes(this.getAttribute('size')) ? this.getAttribute('size') : 'regular';
    const href = this.getAttribute('href');
    const classes = `button button--${variant} button--${size}`;
    this.innerHTML = href
      ? `<a class="${classes}" href="${escape(url(href))}">${escape(label)}</a>`
      : `<button type="button" class="${classes}" ${this.hasAttribute('disabled') ? 'disabled' : ''}>${escape(label)}</button>`;
    this._label = label;
  }
  set loading(value) {
    const button = this.querySelector('button');
    if (!button) return;
    if (value) {
      if (button.getAttribute('aria-busy') === 'true') return;
      this._disabled = button.disabled;
      button.style.minWidth = `${button.getBoundingClientRect().width}px`;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = '저장 중…';
    } else {
      button.disabled = this._disabled ?? this.hasAttribute('disabled');
      button.removeAttribute('aria-busy');
      button.textContent = this._label;
      button.style.minWidth = '';
    }
  }
});
