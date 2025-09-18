import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterActionButtonsWrapper = styled.div<{
  marginButton?: number;
}>`
  ${({ marginButton }) => css`
    display: flex;
    justify-content: flex-end;
    column-gap: 9px;
    margin-bottom: ${marginButton ?? 40}px;
  `}
`;
