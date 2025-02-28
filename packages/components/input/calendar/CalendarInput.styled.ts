import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.div`
  position: relative;
  width: 438px;
`;

export const calendarInput = (disabled?: boolean) => (theme: Theme) => css`
  height: 44px;
  padding: 0 44px 0 12px;
  background-color: ${theme.color.white};

  &::placeholder {
    color: ${theme.color.gray_40};
  }

  &:disabled {
    background-color: ${disabled ? theme.color.gray_20 : theme.color.white};
  }
`;

export const calendarDialogButton = (disabled?: boolean) => css`
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
