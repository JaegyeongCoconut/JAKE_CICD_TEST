import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const labelContent = (theme: Theme) => css`
  margin-top: 40px;
  border-top: 1px solid ${theme.color.gray_20};
  border-bottom: 1px solid ${theme.color.gray_20};
  padding: 40px 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 12px;
`;

export const input = css`
  width: 500px;
`;

export const errorMessage = css`
  margin-top: 4px;
`;
