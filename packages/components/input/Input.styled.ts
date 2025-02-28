import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Input = styled.input<{ hasError: boolean }>`
  ${({ theme, hasError }) => css`
    ${theme.input.default(hasError)};
  `}
`;
