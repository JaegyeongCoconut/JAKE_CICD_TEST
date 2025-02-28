export const breakPoint = {
  device: {
    banner: `(min-width: 1488px)`,
  },
} as const;

export type BreakPointTheme = typeof breakPoint;
