import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const input = (hasError: boolean) => (theme: Theme) => css`
  ${theme.input.default(hasError)};
`;
