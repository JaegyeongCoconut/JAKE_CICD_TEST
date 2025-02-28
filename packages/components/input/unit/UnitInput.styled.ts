import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface InputWrapperProps {
  isCurrency: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme, isCurrency, hasError, disabled }) => css`
    display: flex;
    justify-content: flex-start;
    flex-direction: ${isCurrency ? "row" : "row-reverse"};
    align-items: center;
    column-gap: 12px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid ${hasError ? theme.color.red_20 : theme.color.gray_30};
    background-color: ${disabled && theme.color.gray_10};

    :focus-within {
      border: 1px solid ${theme.color.blue_10};
    }
  `}
`;

export const input = (interval: number) => css`
  width: calc(100% - 12px - 12px - ${interval}px);
  flex-grow: 1;
  height: 100%;
  border: none;
  padding: 0;

  &:focus {
    border: none;
  }
`;

export const Unit = styled.label`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    color: ${theme.color.black};
  `}
`;
