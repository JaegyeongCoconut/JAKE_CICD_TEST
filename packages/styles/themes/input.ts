import { css } from "@emotion/react";

import { color } from "./color";
import { font } from "./font";

export const input = {
  default: (hasError?: boolean) => css`
    ${font.regular_14};
    width: 100%;
    height: 40px;
    border: 1px solid ${hasError ? color.red_20 : color.gray_30};
    padding: 9px 12px;
    color: ${color.black};

    &::placeholder {
      ${font.regular_14};
      color: ${color.gray_40};
    }

    &:focus {
      border: 1px solid ${color.blue_10};
    }
  `,
} as const;

export type InputType = typeof input;
