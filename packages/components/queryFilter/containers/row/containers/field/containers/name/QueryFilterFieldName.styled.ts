import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface QueryFilterFieldNameProps {
  hasCheckbox: boolean;
  hasError: boolean;
  isFocused: boolean;
}

export const QueryFilterFeildName = styled.div<QueryFilterFieldNameProps>`
  ${({ theme, hasCheckbox, hasError, isFocused }) => css`
    ${theme.font.medium_14};
    display: flex;
    justify-content: ${hasCheckbox && "space-between"};
    align-items: center;
    height: 100%;
    border-bottom: ${hasError
      ? `1px solid ${theme.color.red_50}`
      : isFocused && `1px solid ${theme.color.blue_60}`};
    padding: 13px 20px;
    color: ${hasError
      ? theme.color.red_50
      : isFocused
        ? theme.color.blue_60
        : theme.color.gray_60};
    background-color: ${hasError
      ? theme.color.red_20
      : isFocused
        ? theme.color.blue_60_10
        : theme.color.gray_10};
  `}
`;

export const Required = styled.span`
  ${({ theme }) => css`
    margin-left: 4px;
    color: ${theme.color.red_50};
  `}
`;
