import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface PageHeaderProps {
  hasMarginBottom: boolean;
  marginBottom: number;
}

export const PageHeader = styled.div<PageHeaderProps>`
  ${({ hasMarginBottom, marginBottom }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${hasMarginBottom ? marginBottom : 0}px;
  `}
`;

export const heading = (theme: Theme) => css`
  ${theme.font.bold_24};
  color: ${theme.color.gray_90};
`;
