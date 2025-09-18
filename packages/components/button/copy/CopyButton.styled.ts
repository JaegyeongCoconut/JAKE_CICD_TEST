import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const copyButton = (theme: Theme) => css`
  svg {
    width: 16px;
    height: 16px;
  }

  path {
    fill: ${theme.color.blue_60};
  }

  &:hover path {
    fill: ${theme.color.blue_90};
  }
`;
