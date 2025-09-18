import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.color.gray_20};
  `}
`;

export const button = css`
  margin-top: 40px;
`;
