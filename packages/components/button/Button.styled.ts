import { css } from "@emotion/react";
import styled from "@emotion/styled";

import type { ButtonVariant } from "./Button";

const mixinContents = css`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

interface ButtonProps {
  isLoading: boolean;
  variant: ButtonVariant;
}

export const Button = styled.button<ButtonProps>`
  ${({ theme, variant, isLoading }) => css`
    ${mixinContents};
    ${variant === "error" && theme.button.error};
    ${variant === "filled_gray_blue" && theme.button.filled_gray_blue};
    ${variant === "ghost_blue" && theme.button.ghost_blue};
    ${variant === "outlined" && theme.button.outlined};
    ${variant === "primary" && theme.button.primary};
    ${variant === "secondary" && theme.button.secondary};
    ${variant === "third" && theme.button.third};
    pointer-events: ${isLoading && "none"};
  `}
`;

export const LoadingWrapper = styled.div`
  position: relative;
`;

export const LoadingContents = styled.div`
  ${mixinContents};
  visibility: hidden;
`;

export const loadingSpinner = css`
  position: absolute;
`;
