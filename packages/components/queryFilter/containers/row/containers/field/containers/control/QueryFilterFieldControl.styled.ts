import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface QueryFilterFieldControlProps {
  hasError: boolean;
  isFocused: boolean;
}

export const QueryFilterFieldControl = styled.div<QueryFilterFieldControlProps>`
  ${({ theme, isFocused, hasError }) => css`
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: ${hasError
      ? `1px solid ${theme.color.red_50}`
      : isFocused && `1px solid ${theme.color.blue_60}`};
  `}
`;
