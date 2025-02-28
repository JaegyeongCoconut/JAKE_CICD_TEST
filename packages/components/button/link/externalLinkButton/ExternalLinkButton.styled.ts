import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { button } from "@repo/styles/themes";

interface ExternalLinkButtonProps {
  variant: keyof typeof button;
}

export const ExternalLinkButton = styled.a<ExternalLinkButtonProps>`
  ${({ theme, variant }) => css`
    ${variant === "primary" && theme.button.primary};
    ${variant === "secondary" && theme.button.secondary};
    ${variant === "third" && theme.button.third};
    ${variant === "error" && theme.button.error};
    ${variant === "outlined" && theme.button.outlined};
    ${variant === "alert_gray" && theme.button.alert_gray};
    ${variant === "ghost" && theme.button.ghost};
    ${variant === "ghost_blue" && theme.button.ghost_blue};
    ${variant === "ghost_red" && theme.button.ghost_red};
  `}
`;
