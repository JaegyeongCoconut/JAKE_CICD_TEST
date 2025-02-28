import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface ModalButtonProps {
  hasError: boolean;
  disabled?: boolean;
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
    color: ${theme.color.black};
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
    fill: ${theme.color.black};
  }
`;

interface ContentProps {
  color: "black" | "gray";
}

export const Content = styled.span<ContentProps>`
  ${({ theme, color }) => css`
    ${theme.font.regular_14};
    text-align: left;
    color: ${color === "black" ? theme.color.black : theme.color.gray_40};
  `}
`;
