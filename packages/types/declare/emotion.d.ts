import "@emotion/react";

import type { theme } from "@repo/styles/themes";

type CustomTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
