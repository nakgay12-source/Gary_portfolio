/* 기본 입력 요소를 사용하여 키보드 입력과 폼 전송을 유지합니다. */
customElements.define('p-field', class extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input, textarea')) return;
    const { escape } = PortfolioUI;
    const id = PortfolioUI.id();
    const label = this.getAttribute('label') || '입력';
    const max = Number(this.getAttribute('maxlength'));
    const hasMax = Number.isInteger(max) && max > 0;
    const required = this.hasAttribute('required');
    const type = ['email', 'password', 'text'].includes(this.getAttribute('type')) ? this.getAttribute('type') : 'text';
    const common = `id="${id}" class="field" name="${escape(this.getAttribute('name') || id)}" ${required ? 'required' : ''} ${hasMax ? `maxlength="${max}"` : ''} aria-describedby="${id}-help ${id}-count ${id}-error"`;
    this.innerHTML = `<label for="${id}">${escape(label)}${required ? ' <span class="required">필수</span>' : ''}</label>
      ${this.hasAttribute('multiline') ? `<textarea ${common}></textarea>` : `<input ${common} type="${type}" autocomplete="${escape(this.getAttribute('autocomplete') || 'off')}">`}
      <div class="field-meta"><span id="${id}-help">${escape(this.getAttribute('help') || '')}</span><span id="${id}-count"></span></div>
      <p class="field-error" id="${id}-error" hidden></p>`;
    this.control = this.querySelector('input, textarea');
    this.control.value = this.getAttribute('value') || '';
    this.count = this.querySelector(`#${id}-count`);
    this.errorNode = this.querySelector(`#${id}-error`);
    this._max = hasMax ? max : null;
    this.updateCount();
    this.control.addEventListener('input', () => { this.updateCount(); this.error = ''; });
    this.control.addEventListener('invalid', () => {
      this.error = this.control.validity.valueMissing ? `${label} 항목을 입력해 주세요.` : '입력 형식을 확인해 주세요.';
    });
  }
  updateCount() { this.count.textContent = this._max ? `${this.control.value.length} / ${this._max}자` : ''; }
  get value() { return this.control.value; }
  set value(value) { this.control.value = value; this.updateCount(); }
  set error(message) {
    this.errorNode.textContent = message;
    this.errorNode.hidden = !message;
    this.control.setAttribute('aria-invalid', String(Boolean(message)));
    this.control.setCustomValidity(message);
  }
});
