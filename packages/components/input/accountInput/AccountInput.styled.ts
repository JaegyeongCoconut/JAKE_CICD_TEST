import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const headlessAccountInput = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  height: 52px;
`;

export const label = (isLabelTop: boolean) => (theme: Theme) => css`
  ${isLabelTop ? theme.font.regular_12 : theme.font.regular_15};
  position: absolute;
  top: ${isLabelTop ? 0 : "16px"};
  color: ${theme.color.gray_50};
  transition-duration: 0.3s;
`;

export const input = (hasError: boolean) => (theme: Theme) => css`
  ${theme.font.regular_15};
  height: 37px;
  border: 0;
  border-bottom: 1px solid
    ${hasError ? theme.color.red_50 : theme.color.gray_30};
  padding-right: calc(24px + 16px);
  outline: 0;
  background-color: inherit;

  &:focus {
    border: 0;
    border-bottom: 1px solid ${theme.color.blue_60};
  }
`;

export const button = css`
  position: absolute;
  right: 0px;
  bottom: 12px;
  width: 24px;
  height: 24px;
`;

export const eyeIcon = (isShow: boolean) => (theme: Theme) => css`
  width: 24px;

  & > path {
    fill: ${isShow ? theme.color.blue_60 : theme.color.gray_40};
  }
`;
