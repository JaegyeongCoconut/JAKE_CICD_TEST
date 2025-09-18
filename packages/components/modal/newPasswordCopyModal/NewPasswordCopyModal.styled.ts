import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const detailModal = css`
  row-gap: 20px;

  & > div:last-of-type {
    justify-content: flex-end;
  }
`;

export const copyButton = (theme: Theme) => css`
  & > svg > path {
    fill: ${theme.color.blue_60};
  }
`;

export const Content = styled.div`
  display: flex;
  column-gap: 8px;
`;
