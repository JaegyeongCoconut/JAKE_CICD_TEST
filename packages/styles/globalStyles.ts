import { css } from "@emotion/react";
import emotionReset from "emotion-reset";

import { FONT_FAMILY } from "@repo/assets/static/common";

import { infoWindow } from "./themes/map";
import { theme } from "./themes/theme";
import "react-loading-skeleton/dist/skeleton.css";

const globalStyles = css`
  ${emotionReset}

  *,
  *::before,
  *::after {
    margin: 0;
    /* NOTE: 모바일 브라우저에서도 동일하게 보이도록 border 속성 초기화 추가 */
    border-radius: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }

  html {
    font-size: 62.5%; /* 10px */
  }

  body {
    overflow-y: auto;
    font-family: ${FONT_FAMILY};
    font-display: swap;
    color: ${theme.color.gray_90};
  }

  #root {
    display: grid;
  }

  .a11y {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    font-family: "NotoSans", sans-serif;
    background-color: transparent;
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
      -webkit-box-shadow: 0 0 0px 1000px inherit inset;
      transition: background-color 5000s ease-in-out 0s;
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
  ${infoWindow.branch};
  ${infoWindow.fixedPoint};
  ${infoWindow.location};
`;

export default globalStyles;
