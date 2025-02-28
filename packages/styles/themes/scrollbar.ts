import { css } from "@emotion/react";

import { color } from "./color";
import { size } from "./size";

export const scrollbar = css`
  position: relative;
  z-index: 10;
  overflow: auto;

  ::-webkit-scrollbar {
    width: ${size.SCROLL_BAR_WIDTH};
    background-color: ${color.gray_10};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${color.gray_20};
    margin-right: 2px;
    border-radius: 50px;
  }
`;

export type ScrollTheme = typeof scrollbar;
