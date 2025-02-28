import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { FONT_FAMILY } from "@repo/assets/static";

import { infoWindow } from "./themes/map";
import { theme } from "./themes/theme";

const globalStyles = css`
  ${emotionReset}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    /* NOTE: 모바일 브라우저에서도 동일하게 보이도록 border 속성 초기화 추가 */
    border-radius: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  html {
    font-size: 62.5%; // 10px
  }

  body {
    font-family: ${FONT_FAMILY};
    font-display: swap;
    color: ${theme.color.black};
    overflow-y: auto;
  }

  #root {
    display: grid;
  }

  .a11y {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background-color: transparent;
    font-family: "NotoSans", sans-serif;

    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
    }
  }

  input,
  textarea {
    font-family: "NotoSans", sans-serif;
    ${theme.font.regular_14};
    :focus {
      outline: none;
    }
    ::placeholder {
      color: ${theme.color.gray_40};
    }
  }

  textarea {
    overflow: hidden;
    resize: none;
  }

  input {
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-box-shadow: 0 0 0px 1000px inherit inset;
    }
    &:disabled {
      ${theme.disabled.default};
    }
  }

  li {
    list-style: none;
  }

  dialog {
    border: 0;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  .sun-editor-editable {
    // globalStyles ul,li list-style을 지워주기 때문에
    // editor 내부에서 list-style을 보기 위함
    ul,
    li {
      list-style: unset;
    }
  }
  ${infoWindow.location};
  ${infoWindow.fixedPoint};
  ${infoWindow.branch};
`;

export default globalStyles;
