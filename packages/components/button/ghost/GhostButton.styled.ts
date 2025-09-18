import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { ButtonVariant } from "./GhostButton";

interface GhostButtonProps {
  variant: ButtonVariant;
  isLoading: boolean;
}

export const GhostButton = styled.button<GhostButtonProps>`
  ${({ theme, variant, isLoading }) => css`
    ${variant === "alert" && theme.button.alert};
    ${variant === "alert_blue" && theme.button.alert_blue};
    ${variant === "alert_red" && theme.button.alert_red};
    ${variant === "ghost" && theme.button.ghost};
    ${variant === "ghost_blue" && theme.button.ghost_blue};
    ${variant === "ghost_red" && theme.button.ghost_red};
    pointer-events: ${isLoading && "none"};
  `}
`;

export const loadingSpinner = css`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 12px;
  height: 12px;
  transform: translate(50%, -50%);
`;
