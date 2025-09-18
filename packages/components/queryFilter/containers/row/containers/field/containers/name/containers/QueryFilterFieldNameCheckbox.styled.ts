import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const checkbox = (theme: Theme) => css`
  & > label > label {
    background-color: ${theme.color.white_00};
  }
`;
