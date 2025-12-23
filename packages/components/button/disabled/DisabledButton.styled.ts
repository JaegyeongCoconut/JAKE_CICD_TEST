import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

import type { ButtonVariant } from "@repo/types";

export const button = (variant: ButtonVariant) => (theme: Theme) => css`
  ${variant === "error" && theme.button.error};
  ${variant === "filled_gray_blue" && theme.button.filled_gray_blue};
  ${variant === "ghost_blue" && theme.button.ghost_blue};
  ${variant === "outlined" && theme.button.outlined};
  ${variant === "primary" && theme.button.primary};
  ${variant === "secondary" && theme.button.secondary};
  ${variant === "third" && theme.button.third};
  display: flex;
  align-items: center;
  column-gap: 8px;
  pointer-events: none;
`;
