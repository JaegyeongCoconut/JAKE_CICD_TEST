import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.red_50};
  `}
`;
