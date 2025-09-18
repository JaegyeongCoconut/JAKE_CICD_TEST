import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const toast = (theme: Theme) => css`
  position: fixed;
  top: 40px;
  left: 50%;
  height: max-content;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: ${theme.zIndex.TOAST};

  & > div:not(:first-of-type) {
    margin-top: 8px;
  }
`;
