import { css } from "@emotion/react";

import { color } from "./color";
import { size } from "./size";

export const scrollbar = css`
  position: relative;
  overflow: auto;
  z-index: 10;

  ::-webkit-scrollbar {
    width: ${size.SCROLL_BAR_WIDTH};
    background-color: ${color.gray_10};
  }
  ::-webkit-scrollbar-thumb {
    margin-right: 2px;
    border-radius: 50px;
    background-color: ${color.gray_20};
  }
`;

export type ScrollTheme = typeof scrollbar;
