import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const PasswordInput = styled.input<{ hasError?: boolean }>`
  ${({ theme, hasError }) => css`
    ${theme.input.default(hasError)};
    width: 100%;
    padding-right: calc(24px + 16px);
  `}
`;

export const PasswordShowButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
`;

export const eyeIcon = (isShow: boolean) => (theme: Theme) => css`
  width: 20px;

  & > path {
    fill: ${isShow ? theme.color.blue_10 : theme.color.gray_40};
  }
`;
