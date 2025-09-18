import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface QueryFilterRowProps {
  partition: number;
}

export const QueryFilterRow = styled.div<QueryFilterRowProps>`
  ${({ theme, partition }) => css`
    display: grid;
    grid-template-columns: repeat(${partition}, 1fr);
    border-bottom: 1px solid ${theme.color.gray_20};
    background-color: ${theme.color.white_00};
  `}
`;
