import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BreadcrumbDropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const BreadcrumbDropdownButton = styled.button`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_50};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`;

export const BreadcrumbDropdownUl = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    top: 100%;
    width: 134px;
    border: 1px solid ${theme.color.gray_30};
    border-bottom: 0px;
    box-shadow: ${theme.boxShadow.shadow_bold};
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.DROPDOWN};
  `}
`;

interface BreadcrumbDropdownLiProps {
  content: string;
  showTooltip: boolean;
}

export const BreadcrumbDropdownLi = styled.li<BreadcrumbDropdownLiProps>`
  ${({ theme, showTooltip, content }) => css`
    ${theme.font.regular_13};
    position: relative;
    max-width: 134px;
    border-bottom: 1px solid ${theme.color.gray_30};
    padding: 9px 12px;
    color: ${theme.color.gray_60};

    a {
      display: block;
      overflow: hidden;
      color: ${theme.color.gray_60};
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        text-decoration: underline;

        ${showTooltip &&
        css`
          &::after {
            ${theme.font.regular_11};
            content: "${content}";
            position: absolute;
            top: 24px;
            left: 9px;
            margin-top: 4px;
            border-radius: 2px;
            padding: 2px 4px;
            color: ${theme.color.white_00};
            background-color: ${theme.color.gray_80};
            z-index: ${theme.zIndex.DROPDOWN};
          }
        `}
      }
    }
  `}
`;
