import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Header = styled.header`
  ${({ theme }) => css`
    position: sticky;
    top: ${theme.size.HEADER_HEIGHT};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-bottom: 12px;
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.STICKY};
  `}
`;

export const LeftContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 5px 0;

    & > h2 {
      ${theme.font.medium_18};
      margin-right: 12px;
      color: ${theme.color.gray_90};
    }
  `}
`;

export const Refetch = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13}
    display: flex;
    align-items: center;
    height: 20px;

    & > span {
      color: ${theme.color.gray_60};
    }

    & > time {
      margin: 0 2px 0 4px;
      color: ${theme.color.gray_80};
    }
  `}
`;

export const RefetchButton = styled.button`
  ${({ theme }) => css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${theme.color.gray_10};
  `}
`;

export const resetIcon = (theme: Theme) => css`
  width: 12px;
  height: 12px;

  & > path {
    fill: ${theme.color.gray_70};
  }
`;

export const ActiveWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const excelDownloadButton = (theme: Theme) => css`
  & > svg {
    width: 22px;
    height: 22px;

    & > path {
      fill: ${theme.color.gray_60};
    }
  }
`;
