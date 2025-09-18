import { css } from "@emotion/react";

import { color } from "./color";

export const layout = {
  auth: css`
    display: flex;
    flex-direction: column;
    min-width: 528px;
    border: 1px solid ${color.gray_20};
    padding: 64px;
    background-color: ${color.white_00};
  `,
} as const;

export type LayoutType = typeof layout;
