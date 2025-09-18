import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HorizontalLine = styled.div`
  ${({ theme }) => css`
    margin-bottom: 40px;
    border-bottom: 1px solid ${theme.color.gray_20};
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 12px;
`;
