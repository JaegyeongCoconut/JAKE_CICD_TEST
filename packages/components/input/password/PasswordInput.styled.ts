import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const headlessPasswordInput = css`
  position: relative;
  width: 100%;
`;

export const passwordInput = (hasError: boolean) => (theme: Theme) => css`
  ${theme.input.default(hasError)};
  width: 100%;
  padding-right: calc(20px + 12px);
`;

export const passwordButton = css`
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
    fill: ${isShow ? theme.color.blue_60 : theme.color.gray_40};
  }
`;
