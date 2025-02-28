export const boxShadow = {
  shadow_regular: "0px 0px 16px 0 rgba(25, 31, 40, 0.06)",
  shadow_medium: "0px 0px 16px 0 rgba(25, 31, 40, 0.12)",
  shadow_bold: "0px 0px 16px 0 rgba(25, 31, 40, 0.2)",
} as const;

export type BoxShadowType = typeof boxShadow;
