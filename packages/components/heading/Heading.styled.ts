import { css } from "@emotion/react";
import styled from "@emotion/styled";

const a11yTheme = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

interface TagProps {
  hasA11y: boolean;
}

export const H1 = styled.h1<TagProps>`
  ${({ hasA11y }) => hasA11y && a11yTheme}
`;

export const H2 = styled.h2<TagProps>`
  ${({ hasA11y }) => hasA11y && a11yTheme}
`;

export const H3 = styled.h3<TagProps>`
  ${({ hasA11y }) => hasA11y && a11yTheme}
`;
