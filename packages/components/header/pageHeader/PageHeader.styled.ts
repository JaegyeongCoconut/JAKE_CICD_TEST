import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const PageHeader = styled.div<{ marginBottom?: number }>`
  ${({ marginBottom }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${marginBottom ? `${marginBottom}px` : "12px"};
  `}
`;

export const heading = (theme: Theme) => css`
  ${theme.font.bold_24};
  color: ${theme.color.black};
`;
