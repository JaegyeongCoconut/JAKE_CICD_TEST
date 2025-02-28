import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface TextareaWrapperProps {
  disabled?: boolean;
}

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
  ${({ theme, disabled }) => css`
    position: relative;
    width: 100%;
    padding: 13px 20px 37px;
    background-color: ${disabled && theme.color.gray_10};
    cursor: ${disabled && "not-allowed"};
  `}
`;

export const Textarea = styled.textarea<TextareaWrapperProps>`
  ${({ theme, disabled }) => css`
    ${theme.scrollbar};
    width: 100%;
    height: 100%;
    border: 0;
    color: ${theme.color.black};
    resize: none;

    &::placeholder {
      ${theme.font.regular_14};
      color: ${theme.color.gray_40};
    }

    &:disabled {
      color: inherit;
      background-color: ${disabled ? theme.color.gray_10 : "inherit"};
      cursor: ${disabled && "not-allowed"};
    }
  `}
`;

export const Length = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    position: absolute;
    bottom: 13px;
    left: 20px;
    color: ${theme.color.gray_50};
    z-index: 11;
  `}
`;
