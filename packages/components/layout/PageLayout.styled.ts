import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PageLayout = styled.section`
  ${({ theme }) => css`
    position: relative;
    min-width: ${theme.size.SECTION_MIN_WIDTH};
    width: ${`calc(100vw - ${theme.size.NAV_WIDTH} - ${theme.size.MAIN_PADDING_SIDE} * 2)`};
    max-width: ${theme.size.SECTION_MAX_WIDTH};
    margin: 0 auto;
  `}
`;

export const PageLayoutBreadcrumb = styled.ul`
  display: flex;
  column-gap: 16px;
  max-width: 648px;
  margin-bottom: 8px;
`;

interface PageLayoutBreadcrumbLiProps {
  hasEllipsis: boolean;
  content: string;
}

export const PageLayoutBreadcrumbLi = styled.li<PageLayoutBreadcrumbLiProps>`
  ${({ theme, content, hasEllipsis }) => css`
    position: relative;
    display: flex;
    align-items: center;
    max-width: ${hasEllipsis ? "216px" : "auto"};

    &:last-of-type > a {
      color: ${theme.color.gray_70};
    }

    &:not(:last-of-type)::after {
      content: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.65 5.478L5.551 3.437L0.65 1.11V0.0959995L6.773 3.151V3.801L0.65 6.492V5.478Z' fill='%23A2ABB0'/%3E%3C/svg%3E%0A");
      position: absolute;
      right: -12px;
      width: 8px;
      height: 8px;
    }

    a {
      white-space: ${hasEllipsis ? "nowrap" : "normal"};
      overflow: ${hasEllipsis ? "hidden" : "visible"};
      text-overflow: ${hasEllipsis ? "ellipsis" : "clip"};
      max-width: ${hasEllipsis ? "216px" : "auto"};
    }

    ${hasEllipsis &&
    css`
      &:hover::before {
        ${theme.font.regular_11};
        content: "${content}";
        position: absolute;
        top: 100%;
        left: 0;
        border-radius: 2px;
        padding: 2px 4px;
        background-color: ${theme.color.gray_80};
        color: ${theme.color.white};
        z-index: ${theme.zIndex.DROPDOWN};
      }
    `}
  `}
`;

export const skeleton = css`
  margin-top: 8px;
`;
