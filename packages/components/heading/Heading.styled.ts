import { css } from "@emotion/react";
import styled from "@emotion/styled";

const a11yTheme = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
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
