import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface QueryFilterTagProps {
  isExpanded: boolean;
  wrapperWidth: number;
}

export const QueryFilterTagName = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_14};
    margin-right: 4px;
    color: ${theme.color.gray_90};
  `}
`;

export const QueryFilterTagContent = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.gray_90};
  `}
`;

export const button = (theme: Theme) => css`
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

export const QueryFilterTag = styled.li<QueryFilterTagProps>`
  ${({ theme, isExpanded, wrapperWidth }) => css`
    position: relative;
    height: 32px;
    /* NOTE: 20px: wrapper의 padding 값, 16px: SelectedLabel의 x 아이콘 너비 */
    max-width: ${isExpanded
      ? `calc(${wrapperWidth}px - 20px - 16px)`
      : "330px"};
    padding: 5px 32px 5px 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: ${theme.color.gray_10};
  `}
`;
