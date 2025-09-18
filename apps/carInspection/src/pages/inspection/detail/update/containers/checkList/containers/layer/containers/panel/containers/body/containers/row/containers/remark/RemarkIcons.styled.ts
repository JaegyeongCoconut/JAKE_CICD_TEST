import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const RemarkIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding: 12px;
`;

export const button = (hasItems: boolean) => (theme: Theme) => css`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  padding: 4px;
  background-color: ${hasItems ? theme.color.blue_60_10 : theme.color.gray_10};

  & > svg {
    width: 16px;
    height: 16px;

    & > path {
      fill: ${hasItems ? theme.color.blue_60 : theme.color.gray_40};
    }
  }
`;

export const icon = (hasItems: boolean) => (theme: Theme) => css`
  width: 16px;
  height: 16px;

  & > path {
    fill: ${hasItems ? theme.color.blue_60 : theme.color.gray_40};
  }
`;
