import { css, type Theme } from "@emotion/react";

export const copyButton = (theme: Theme) => css`
  svg {
    width: 16px;
    height: 16px;
  }

  g > path {
    fill: ${theme.color.blue_10};
  }

  &:hover g > path {
    fill: ${theme.color.blue_20};
  }
`;
