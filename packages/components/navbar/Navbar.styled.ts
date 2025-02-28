import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Navbar = styled.nav`
  ${({ theme }) => css`
    position: fixed;
    top: ${theme.size.HEADER_HEIGHT};
    left: 0;
    width: ${theme.size.NAV_WIDTH};
    height: calc(100% - ${theme.size.HEADER_HEIGHT});
    background-color: ${theme.color.gray_80};
    z-index: ${theme.zIndex.NAV};
  `}
`;

interface LinkProps {
  content: string;
}

export const Link = styled(NavLink)<LinkProps>`
  ${({ theme, content }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;

    & > svg {
      fill: ${theme.color.gray_50};
    }

    &[aria-selected="true"] {
      background-color: ${theme.color.white_10};
      & > svg {
        fill: ${theme.color.white};
      }
    }

    :hover {
      background-color: ${theme.color.white_10};

      ::after {
        ${theme.font.medium_11};

        content: ${content};
        position: absolute;
        left: 80px;
        width: max-content;
        border-radius: 2px;
        padding: 2px 4px;
        color: ${theme.color.white};
        background-color: ${theme.color.gray_80};
      }
    }
  `}
`;

export const link = (content: string) => (theme: Theme) => css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;

  :hover {
    background-color: ${theme.color.white_10};

    :after {
      ${theme.font.medium_11};

      content: "${content}";
      position: absolute;
      left: 80px;
      width: max-content;
      border-radius: 2px;
      padding: 2px 4px;
      color: ${theme.color.white};
      background-color: ${theme.color.gray_80};
    }
  }

  & > svg {
    width: 24px;
    fill: ${theme.color.gray_50};
    /* NOTE: Logistics property icon 색상 변경을 위해 필요 */
    & > path,
    & > g > path {
      fill: ${theme.color.gray_50};
    }
  }

  &.active {
    background-color: ${theme.color.white_10};

    & > svg {
      fill: ${theme.color.white};

      /* NOTE: IoT의 icon 은 path를 포함해야 함 */
      & > path,
      & > g > path {
        fill: ${theme.color.white};
      }
    }
  }
`;
