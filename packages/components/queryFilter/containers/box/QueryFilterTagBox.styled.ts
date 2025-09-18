import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterTagBoxWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 10px 20px;
    background-color: ${theme.color.white_00};
  `}
`;

export const QueryFilterTagBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 12px;
  column-gap: 8px;
  max-width: fit-content;
`;
