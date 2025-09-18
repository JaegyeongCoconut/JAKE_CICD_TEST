import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const detailModal = css`
  width: 364px;
`;

export const textarea = (theme: Theme) => css`
  height: 138px;
  border: 1px solid ${theme.color.gray_30};
  padding: 9px 12px 35px 12px;

  & > span {
    bottom: 9px;
    left: 12px;
  }
`;
