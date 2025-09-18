import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const searchInput = css`
  width: 100%;
  height: 40px;
`;

export const SearchWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-rows: 72px 1fr;
    height: 492px;
    border: 1px solid ${theme.color.gray_20};

    :last-of-type {
      border-left: 0;
    }
  `}
`;

export const SearchHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 20px;
    background-color: ${theme.color.gray_10};
  `}
`;

export const SearchBody = styled.div`
  overflow-y: auto;
`;

export const noResult = css`
  row-gap: 8px;
`;

export const Ul = styled.ul`
  height: 100%;
`;

export const Li = styled.li`
  ${({ theme }) => css`
    height: 86px;
    border-bottom: 1px solid ${theme.color.gray_20};
  `}
`;

export const CardButton = styled.button`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 24px;
    align-items: center;
    column-gap: 8px;
    width: 100%;
    height: 100%;
    padding: 0 20px;

    :hover {
      background-color: ${theme.color.gray_10};
    }
  `}
`;

export const CardInfoWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.font.medium_15};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 4px;
    width: 100%;
  `}
`;

export const CardDetailInfoWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    display: flex;
    align-items: center;
    column-gap: 8px;
    width: 100%;
    color: ${theme.color.gray_80};
  `}
`;

export const cardDetailInfoIcon = (theme: Theme) => css`
  width: 16px;
  height: 16px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;

export const successIcon = (isSelected: boolean) => (theme: Theme) => css`
  width: 24px;
  height: 24px;

  & > path {
    fill: ${isSelected ? theme.color.blue_60 : theme.color.gray_40};
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
`;
