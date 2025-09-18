import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterFieldCheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 7px 20px;
`;

export const checkbox = (theme: Theme) => css`
  padding: 6px 12px;

  & > label > span {
    color: ${theme.color.gray_50};
  }
`;
