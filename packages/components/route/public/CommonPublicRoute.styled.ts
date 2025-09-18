import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";

export const commonPublicRoute = (paddingTop: string) => (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: ${paddingTop};
  background-color: ${theme.color.gray_10};
`;
