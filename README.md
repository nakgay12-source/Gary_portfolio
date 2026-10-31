# 포트폴리오 UI 컴포넌트

`design.md`를 기준으로 만든 프레임워크 독립적인 웹 컴포넌트입니다. HTML·CSS·JavaScript만 사용하며 패키지 설치나 빌드가 필요 없습니다. 모든 코드 주석은 한글로 작성했습니다.

## 미리보기 실행

`index.html`을 최신 Chrome 또는 Edge에서 열면 됩니다. 파일을 더블클릭해도 실행할 수 있도록 일반 스크립트로 구성했습니다. 로컬 서버에서도 같은 파일을 제공할 수 있습니다.

이 페이지는 컴포넌트 확인용입니다. 로그인, 데이터 저장, 파일 업로드, 실제 게시·비공개 전환은 연결되어 있지 않습니다. 버튼을 누르면 동작 상태와 검증을 시연합니다. 새로고침하면 입력 내용은 초기화됩니다.

## 파일 구성

```text
portfolio/
├── prd.md
├── design.md
├── README.md
├── index.html               # 컴포넌트 확인 화면
├── showcase.js              # 확인 화면 전용 상호작용
├── styles/
│   ├── tokens.css           # 색상·간격·모서리 공통 값
│   ├── base.css             # 글꼴·반응형·기본 배치
│   ├── components.css       # 재사용 컴포넌트 스타일
│   └── showcase.css         # 확인 화면 전용 스타일
└── components/
    ├── utils.js             # 문자열 처리·주소 검사·고유 식별자
    ├── button.js            # 이동 링크·동작 버튼·로딩 상태
    ├── badge.js             # 상태 배지
    ├── alert.js             # 안내·성공·주의·오류 알림
    ├── field.js             # 입력창·긴 글·글자 수·오류
    ├── work-card.js         # 선택 이미지가 있는 작업물 카드
    ├── header.js            # 머리말
    ├── footer.js            # 꼬리말
    ├── empty-state.js       # 빈 화면과 다음 이동 링크
    └── dialog.js            # 확인 대화상자
```

## 다른 페이지에서 사용

공통 CSS를 아래 순서로 불러옵니다. `showcase.css`와 `showcase.js`는 확인 화면 전용이므로 다른 페이지에서는 필요하지 않습니다.

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/base.css">
<link rel="stylesheet" href="styles/components.css">

<script defer src="components/utils.js"></script>
<script defer src="components/button.js"></script>
<script defer src="components/field.js"></script>
```

`utils.js` 다음에 필요한 컴포넌트 파일을 한 번씩 로드합니다. 외부 라이브러리·폰트·이미지 서비스는 필요하지 않습니다. 컴포넌트는 일반 DOM에 실제 HTML 요소를 생성하므로 공통 CSS가 적용되며, 입력창은 기본 HTML 폼에서 사용할 수 있습니다.

## 컴포넌트 사용법

| 컴포넌트 | 주요 속성 | 기능 |
| --- | --- | --- |
| `p-button` | `variant`, `size`, `href`, `disabled`, `block` | 기본 버튼 또는 이동 링크 |
| `p-badge` | `tone` | 글자로 상태 표시 |
| `p-alert` | `tone` | 내용 변경을 보조기기에 알림 |
| `p-field` | `label`, `name`, `value`, `required`, `maxlength`, `multiline`, `type`, `help`, `autocomplete` | 입력·글자 수·오류 연결 |
| `p-work-card` | `heading`, `summary`, `href`, `period`, `image`, `alt`, `diagram`, `example` | 카드 전체를 하나의 링크로 생성 |
| `p-header` | `home-href`, `works-href` | 공개 상단 탐색 |
| `p-footer` | 없음 | 공개 하단 소개 |
| `p-empty-state` | `heading`, `description`, `href`, `action-label` | 빈 상태·오류 안내 |
| `p-confirm-dialog` | `heading`, `description`, `confirm-label` | 취소·확인, 초점 관리 |

속성은 생성 시 설정합니다. 런타임에서 `setAttribute()`로 속성을 바꿔 다시 렌더링하는 기능은 제공하지 않습니다. 동적으로 추가할 때는 속성을 먼저 지정한 뒤 DOM에 삽입합니다. 기본적으로 컴포넌트 인스턴스는 한 번 마운트하여 사용합니다.

### 버튼

```html
<p-button id="save">초안 저장</p-button>
<p-button variant="secondary" size="small">수정</p-button>
<p-button variant="text" href="./works.html">작업물 목록으로</p-button>
<p-button size="large" block href="./works.html">업무 개선 사례 보기</p-button>
<p-button disabled>비활성 버튼</p-button>
```

- `variant`: `primary`(기본), `secondary`, `text`
- `size`: 기본 48px, `small` 44px, `large` 52px
- 이동 링크에는 `disabled`나 로딩을 적용하지 않습니다. 사용할 수 없는 이동 경로는 링크 자체를 표시하지 마세요.
- 동작 버튼은 기본 `type="button"`입니다. 폼 검증 후 제출이 필요하면 클릭 핸들러에서 `form.requestSubmit()`을 호출합니다.

```js
const save = document.querySelector('#save');
save.addEventListener('click', async () => {
  save.loading = true;
  try {
    // 실제 저장 함수를 연결하는 위치입니다.
  } finally {
    save.loading = false;
  }
});
```

### 입력창

```html
<p-field id="intro" label="자기소개" name="intro"
  multiline required maxlength="3000"
  help="확인된 경력과 강점을 작성해 주세요."></p-field>
```

```js
const field = document.querySelector('#intro');
field.value = '물류 분야에 관심이 있는 김낙경입니다.';
field.error = '자기소개를 입력해 주세요.';
field.error = '';
```

`.value`는 값을 읽거나 바꾸며 글자 수를 갱신합니다. `.error`는 오류 문구, `aria-invalid`, 기본 입력 검증을 함께 설정합니다. `.control`은 내부의 실제 입력창입니다. 기본 `input`·`change` 이벤트가 상위로 전달됩니다. 프로그램으로 넣은 값은 실제 저장 전에 길이와 형식을 다시 검증해야 합니다.

### 작업물 카드

```html
<p-work-card
  heading="업무 프로세스 개선"
  summary="문제와 개선 과정, 본인의 기여를 정리했습니다."
  href="./works/process.html"
  period="2026.01 ~ 2026.03">
</p-work-card>
```

위 내용은 작성 방법을 설명하기 위한 예시입니다. 실제 기간·성과로 사용하지 마세요. 이미지가 있을 때만 `image`와 설명용 `alt`를 함께 지정합니다. 도표는 `diagram` 속성을 추가해 잘림을 방지합니다. `example`은 확인용 예시 배지를 표시하며 실제 공개 사례에서는 생략합니다.

### 알림과 배지

```html
<p-badge tone="success">게시</p-badge>
<p-badge tone="warning">수정 초안 있음</p-badge>
<p-alert tone="info">초안 저장은 공개 화면에 반영되지 않습니다.</p-alert>
<p-alert tone="error">저장하지 못했습니다. 다시 시도해 주세요.</p-alert>
```

배지의 `tone`은 `neutral`(기본)·`success`·`warning`·`info`, 알림은 `info`(기본)·`success`·`warning`·`error`입니다. 동적 알림은 이미 화면에 있는 요소의 `textContent`를 변경하는 방식을 권장합니다.

### 확인창

```html
<p-confirm-dialog id="visibility"></p-confirm-dialog>
```

```js
const dialog = document.querySelector('#visibility');
document.querySelector('#open-dialog').addEventListener('click', () => dialog.open());
dialog.addEventListener('confirm', () => {
  // 서버의 비공개 전환 요청을 연결하는 위치입니다.
});
```

`.open()`으로 열고 `confirm` 이벤트에서 확정 동작을 연결합니다. 취소와 Escape는 확정 이벤트를 발생시키지 않습니다. 열 때 취소 버튼에 초점을 두고, 닫으면 실행 요소로 초점을 돌려줍니다.

## 테마 변경

색상·여백·둥근 정도는 `styles/tokens.css`에서 수정합니다. 카드 열 개수와 글꼴은 `styles/base.css`, 버튼·폼·대화상자는 `styles/components.css`에서 조정합니다. 768px부터 2열, 1024px부터 3열 카드로 전환됩니다.

## 다음 구현 단계

실제 홈페이지와 관리자 페이지를 구성할 때 위 컴포넌트를 재사용하고, PRD의 인증·권한 검사·공개본과 초안 저장 기능을 별도로 연결합니다. 이 컴포넌트 패키지만으로 접근 권한이나 데이터 영구 저장이 제공되지는 않습니다.
