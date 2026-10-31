/* 모든 컴포넌트가 사용하는 안전한 문자열 변환과 주소 검사입니다. */
window.PortfolioUI = {
  escape(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  },
  url(value) {
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:', 'file:'].includes(url.protocol) ? value : '#';
    } catch { return '#'; }
  },
  sequence: 0,
  id() { return `portfolio-field-${++this.sequence}`; }
};
