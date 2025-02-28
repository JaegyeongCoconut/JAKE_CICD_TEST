import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface MainHeaderProps {
  iconWidth: string;
}

export const MainHeader = styled.header<MainHeaderProps>`
  ${({ theme, iconWidth }) => css`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${theme.size.HEADER_HEIGHT};
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 0 40px;
    background-color: ${theme.color.gray_10};
    z-index: ${theme.zIndex.HEADER};

    & > svg {
      width: ${iconWidth};
    }
  `}
`;

export const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 22px;
`;

export const translateIcon = (theme: Theme) => css`
  width: 16px;
  height: 16px;
  margin-right: 6px;

  & > path {
    fill: ${theme.color.gray_50};
  }
`;

export const LanguageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const dropdown = (theme: Theme) => css`
  min-width: 65px;
  width: max-content;
  padding: 0;

  & > button {
    border: 0 !important;
    padding: 0;

    & > span {
      ${theme.font.regular_13};
      color: ${theme.color.gray_70};
    }

    & > svg {
      width: 12px;
      height: 12px;

      & > path {
        fill: ${theme.color.gray_50};
      }
    }
  }

  & > ul {
    left: -30px;
    min-width: 120px;

    & > li > button {
      ${theme.font.regular_13};
    }
  }
`;

export const logoutButton = (theme: Theme) => css`
  ${theme.font.regular_13};
  text-decoration: none;
`;

export const externalLinkButton = (theme: Theme) => css`
  ${theme.font.regular_13};
  display: flex;
  align-items: center;

  & > svg {
    width: 16px;
    height: 16px;
    margin-right: 6px;

    & > path {
      fill: ${theme.color.gray_50};
    }
  }
`;

export const UserInfoLabel = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    border-right: 1px solid ${theme.color.gray_30};
    padding-right: 20px;
  `}
`;
