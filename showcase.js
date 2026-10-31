/* 확인용 상호작용이며 서버 저장이나 실제 게시를 수행하지 않습니다. */
const feedback = document.querySelector('#feedback');
const formFeedback = document.querySelector('#form-feedback');
const dialog = document.querySelector('#visibility-dialog');
document.querySelector('#dialog-open').addEventListener('click', () => dialog.open());
dialog.addEventListener('confirm', () => { feedback.textContent = '비공개 전환 확인을 체험했습니다. 실제 작업물 상태는 변경하지 않았습니다.'; });
document.querySelector('#small-demo').addEventListener('click', () => { feedback.textContent = '작은 버튼도 최소 44px 높이로 작동합니다.'; });
document.querySelector('#save-demo').addEventListener('click', async event => {
  const component = event.currentTarget;
  component.loading = true;
  feedback.textContent = '저장 상태를 시연하고 있습니다.';
  await new Promise(resolve => setTimeout(resolve, 800));
  component.loading = false;
  feedback.textContent = '저장 상태 체험이 끝났습니다. 실제 데이터는 저장하지 않았습니다.';
});
const form = document.querySelector('#profile-form');
form.addEventListener('submit', event => event.preventDefault());
document.querySelector('#draft').addEventListener('click', () => {
  formFeedback.textContent = '초안 저장 UI 체험입니다. 입력값은 현재 화면에만 유지됩니다.';
});
document.querySelector('#preview').addEventListener('click', () => {
  document.querySelector('#preview-panel').hidden = false;
  document.querySelector('#preview-name').textContent = form.querySelector('[name="name"]').value;
  document.querySelector('#preview-headline').textContent = form.querySelector('[name="headline"]').value;
  document.querySelector('#preview-bio').textContent = form.querySelector('[name="bio"]').value;
  formFeedback.textContent = '아래에 현재 입력 내용의 미리보기를 표시했습니다.';
});
document.querySelector('#publish').addEventListener('click', () => {
  form.querySelectorAll('p-field').forEach(field => {
    field.error = field.hasAttribute('required') && !field.value.trim() ? '필수 내용을 입력해 주세요.' : '';
  });
  if (!form.reportValidity()) return;
  if (!document.querySelector('#publish-check').checked) {
    formFeedback.textContent = '공개 내용 확인 항목에 체크해 주세요.';
    document.querySelector('#publish-check').focus();
    return;
  }
  formFeedback.textContent = '입력 검증을 통과했습니다. UI 체험이므로 실제 공개되지는 않습니다.';
});
