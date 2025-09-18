import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

import type { button } from "@repo/styles/themes";

export const internalLink =
  (variant: keyof typeof button | "iconOnly") => (theme: Theme) => css`
    ${variant === "primary" && theme.button.primary};
    ${variant === "secondary" && theme.button.secondary};
    ${variant === "third" && theme.button.third};
    ${variant === "error" && theme.button.error};
    ${variant === "outlined" && theme.button.outlined};
    ${variant === "ghost" && theme.button.ghost};
    ${variant === "ghost_blue" && theme.button.ghost_blue};
    ${variant === "ghost_red" && theme.button.ghost_red};
  `;
