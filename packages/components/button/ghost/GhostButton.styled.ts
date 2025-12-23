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

    span {
      visibility: ${isLoading ? "hidden" : "visible"};
    }
  `}
`;

export const loadingSpinner = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%);
`;

export const Content = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;
