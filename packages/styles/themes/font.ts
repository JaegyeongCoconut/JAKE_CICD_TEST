import { css } from "@emotion/react";

import { FONT_FAMILY } from "@repo/assets/static/common";

export const font = {
  regular_11: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.1rem;
    font-weight: 400;
    line-height: calc(18 / 11);
  `,
  regular_12: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: calc(20 / 12);
  `,
  regular_13: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.3rem;
    font-weight: 400;
    line-height: calc(22 / 13);
  `,
  regular_14: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: calc(24 / 14);
  `,
  regular_15: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.5rem;
    font-weight: 400;
    line-height: calc(26 / 15);
  `,
  regular_16: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: calc(26 / 16);
  `,
  medium_11: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.1rem;
    font-weight: 500;
    line-height: calc(18 / 11);
  `,
  medium_12: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.2rem;
    font-weight: 500;
    line-height: calc(20 / 12);
  `,
  medium_13: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.3rem;
    font-weight: 500;
    line-height: calc(22 / 13);
  `,
  medium_14: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: calc(24 / 14);
  `,
  medium_15: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.5rem;
    font-weight: 500;
    line-height: calc(26 / 15);
  `,
  medium_16: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: calc(26 / 16);
  `,
  medium_18: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.8rem;
    font-weight: 500;
    line-height: calc(30 / 18);
  `,
  medium_20: css`
    font-family: ${FONT_FAMILY};
    font-size: 2rem;
    font-weight: 500;
    line-height: calc(34 / 20);
  `,
  medium_22: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.2rem;
    font-weight: 500;
    line-height: calc(36 / 22);
  `,
  medium_24: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.4rem;
    font-weight: 500;
    line-height: calc(40 / 24);
  `,
  medium_25: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.5rem;
    font-weight: 500;
    line-height: calc(48 / 25);
  `,
  bold_14: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.4rem;
    font-weight: 700;
    line-height: calc(24 / 14);
  `,
  bold_15: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.5rem;
    font-weight: 700;
    line-height: calc(26 / 15);
  `,
  bold_16: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.6rem;
    font-weight: 700;
    line-height: calc(26 / 16);
  `,
  bold_18: css`
    font-family: ${FONT_FAMILY};
    font-size: 1.8rem;
    font-weight: 700;
    line-height: calc(30 / 18);
  `,
  bold_20: css`
    font-family: ${FONT_FAMILY};
    font-size: 2rem;
    font-weight: 700;
    line-height: calc(34 / 20);
  `,
  bold_24: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.4rem;
    font-weight: 700;
    line-height: calc(40 / 24);
  `,
  bold_26: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.6rem;
    font-weight: 700;
    line-height: calc(44 / 26);
  `,
  bold_30: css`
    font-family: ${FONT_FAMILY};
    font-size: 3rem;
    font-weight: 700;
    line-height: calc(50 / 30);
  `,
  bold_28: css`
    font-family: ${FONT_FAMILY};
    font-size: 2.8rem;
    font-weight: 700;
    line-height: calc(46 / 28);
  `,
} as const;

export type FontType = typeof font;
