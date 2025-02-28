import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Division = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.color.gray_20};
  `}
`;
