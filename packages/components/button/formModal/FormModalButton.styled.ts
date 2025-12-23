import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ModalButtonProps {
  disabled: boolean;
  hasError: boolean;
}

export const FormModalButton = styled.button<ModalButtonProps>`
  ${({ theme, hasError, disabled }) => css`
    ${theme.input.default(hasError)};
    ${theme.font.regular_14};
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    height: 40px;
    padding: 0 12px;
    color: ${theme.color.gray_90};
    background-color: ${disabled && theme.color.gray_10};

    &[disabled] {
      ${theme.disabled.default};
    }
  `}
`;

export const chevronRight = (theme: Theme) => css`
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);

  & > path {
    fill: ${theme.color.gray_90};
  }
`;

interface ContentProps {
  hasLabel: boolean;
}

export const Content = styled.span<ContentProps>`
  ${({ theme, hasLabel }) => css`
    ${theme.font.regular_14};
    color: ${hasLabel ? theme.color.gray_90 : theme.color.gray_40};
    text-align: left;
  `}
`;
