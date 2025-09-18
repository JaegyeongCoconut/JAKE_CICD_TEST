import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Navbar = styled.nav`
  ${({ theme }) => css`
    position: fixed;
    top: ${theme.size.HEADER_HEIGHT};
    left: 0;
    width: ${theme.size.DEFAULT_NAV_WIDTH};
    height: calc(100% - ${theme.size.HEADER_HEIGHT});
    background-color: ${theme.color.gray_80};
    z-index: ${theme.zIndex.NAV};
  `}
`;

interface LinkProps {
  isActive: boolean;
  content: string;
}

export const link =
  ({ content, isActive }: LinkProps) =>
  (theme: Theme) => css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    background-color: ${isActive
      ? theme.color.white_00_10
      : theme.color.gray_80};

    :hover {
      background-color: ${theme.color.white_00_10};

      :after {
        ${theme.font.medium_11};

        content: "${content}";
        position: absolute;
        left: 80px;
        width: max-content;
        border-radius: 2px;
        padding: 2px 4px;
        color: ${theme.color.white_00};
        background-color: ${theme.color.gray_80};
      }
    }

    & > svg {
      width: 24px;
      fill: ${isActive ? theme.color.white_00 : theme.color.gray_50};
      /* NOTE: Logistics property icon 색상 변경을 위해 필요 */
      & > path,
      & > g > path {
        fill: ${isActive ? theme.color.white_00 : theme.color.gray_50};
      }
    }
  `;
