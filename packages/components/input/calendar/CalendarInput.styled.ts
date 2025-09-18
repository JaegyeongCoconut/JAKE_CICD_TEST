import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.div`
  position: relative;
  width: 438px;
`;

interface CalenderInputProps {
  disabled: boolean;
  hasError: boolean;
}

export const calendarInput =
  ({ disabled, hasError }: CalenderInputProps) =>
  (theme: Theme) => css`
    height: 44px;
    border: 1px solid ${hasError ? theme.color.red_50 : theme.color.gray_30};
    padding: 0 44px 0 12px;
    background-color: ${theme.color.white_00};

    &::placeholder {
      color: ${theme.color.gray_40};
    }

    &:disabled {
      background-color: ${disabled
        ? theme.color.gray_20
        : theme.color.white_00};
    }
  `;

export const calendarDialogButton = (disabled: boolean) => css`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  cursor: ${disabled ? "not-allowed" : "cursor"};
`;

export const calendarIcon = (theme: Theme) => css`
  width: 20px;

  path {
    fill: ${theme.color.gray_40};
  }
`;
