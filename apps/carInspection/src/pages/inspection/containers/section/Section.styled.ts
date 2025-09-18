import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const ListWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    border: 1px solid ${theme.color.gray_20};
  `}
`;

export const ListItemWrapper = styled.div`
  height: 704px;
  overflow: auto;
`;

export const noResult = (theme: Theme) => css`
  & > svg {
    margin-bottom: 8px;
  }

  & > div > p {
    ${theme.font.regular_14};
  }
`;
