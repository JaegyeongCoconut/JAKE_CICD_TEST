import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Input = styled.input`
  ${({ theme }) => css`
    ${theme.input.default(false)};
  `}
`;
