import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Label = styled.label<{ hasError: boolean }>`
  ${({ theme, hasError }) => css`
    ${theme.font.medium_14};
    display: flex;
    justify-content: center;
    column-gap: 8px;
    width: 100%;
    margin: 10px 0;
    border: 1px solid ${hasError ? theme.color.red_50 : theme.color.gray_20};
    border-radius: 2px;
    padding: 8px 0;
    color: ${theme.color.blue_60};
    background-color: ${theme.color.gray_10};
    cursor: pointer;

    & > input {
      display: none;
    }
  `}
`;

export const photoIcon = (theme: Theme) => css`
  width: 22px;
  height: 22px;

  & > path {
    fill: ${theme.color.blue_60};
  }
`;

export const checkIcon = (theme: Theme) => css`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${theme.color.green_50};
  }
`;

export const CompletedUploadLabel = styled(Label)`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    column-gap: 10px;
    color: ${theme.color.gray_70};
    cursor: not-allowed;
  `}
`;

export const loadingSpinner = css`
  width: 22px;
  height: 22px;
`;
