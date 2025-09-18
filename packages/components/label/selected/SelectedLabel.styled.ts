import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SearchLabel = styled.li`
  ${({ theme }) => css`
    position: relative;
    height: 32px;
    max-width: 330px;
    padding: 5px 32px 5px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: ${theme.color.gray_10};
  `}
`;

export const closeButton = (theme: Theme) => css`
  position: absolute;
  top: 50%;
  right: 10px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  transform: translateY(-50%);

  & > svg {
    width: 16px;
    height: 16px;

    & > path {
      fill: ${theme.color.gray_40};
    }
  }
`;
