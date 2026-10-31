/* 기본 대화상자의 초점 제한과 Escape 동작을 이용합니다. */
customElements.define('p-confirm-dialog', class extends HTMLElement {
  connectedCallback() {
    const { escape } = PortfolioUI;
    const id = PortfolioUI.id();
    this.innerHTML = `<dialog class="dialog" aria-labelledby="${id}-title" aria-describedby="${id}-description"><h2 id="${id}-title">${escape(this.getAttribute('heading') || '이 사례를 비공개로 전환할까요?')}</h2><p id="${id}-description">${escape(this.getAttribute('description') || '방문자는 이 사례를 볼 수 없게 됩니다. 내용은 관리자 화면에 보관됩니다.')}</p><div class="actions"><button type="button" class="button button--secondary" data-cancel autofocus>취소</button><button type="button" class="button button--primary" data-confirm>${escape(this.getAttribute('confirm-label') || '비공개로 전환')}</button></div></dialog>`;
    this.dialog = this.querySelector('dialog');
    this.querySelector('[data-cancel]').addEventListener('click', () => this.dialog.close('cancel'));
    this.querySelector('[data-confirm]').addEventListener('click', () => this.dialog.close('confirm'));
    this.dialog.addEventListener('close', () => {
      this._trigger?.focus();
      if (this.dialog.returnValue === 'confirm') this.dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
    });
  }
  open() {
    this._trigger = document.activeElement;
    this.dialog.returnValue = '';
    this.dialog.showModal();
    this.querySelector('[data-cancel]').focus();
  }
});
