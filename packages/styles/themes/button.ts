import { css } from "@emotion/react";

import { color } from "./color";
import { font } from "./font";

const mixinDefaultButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 2px;
  padding: 0 18px;
`;

const mixinOutlineButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  border-radius: 4px;
  padding: 0 12px;
`;

export const button = {
  primary: css`
    ${mixinDefaultButton};
    ${font.medium_14};
    color: ${color.white_00};
    background-color: ${color.blue_60};

    &:not(:disabled):hover {
      background-color: ${color.blue_90};
    }

    &:disabled {
      background-color: ${color.blue_60_40};
    }
  `,

  secondary: css`
    ${mixinDefaultButton};
    ${font.medium_14};
    border: 1px solid ${color.gray_20};
    color: ${color.gray_60};
    background-color: ${color.gray_10};

    &:not(:disabled):hover {
      border: 1px solid ${color.gray_30};
      background-color: ${color.gray_20};
    }

    &:disabled {
      opacity: 0.6;
    }
  `,

  third: css`
    ${mixinDefaultButton};
    ${font.medium_14};
    border: 1px solid ${color.gray_20};
    color: ${color.blue_60};
    background-color: ${color.gray_10};

    &:not(:disabled):hover {
      border: 1px solid ${color.gray_30};
      background-color: ${color.gray_20};
    }

    &:disabled {
      border: 1px solid ${color.gray_20};
      background-color: ${color.gray_10};
      opacity: 0.4;
    }
  `,

  outlined: css`
    ${mixinOutlineButton};
    ${font.medium_13};
    border: 1px solid ${color.gray_30};
    color: ${color.gray_70};
    background-color: ${color.white_00};

    &:not(:disabled):hover {
      border: 1px solid ${color.gray_30};
      background-color: ${color.gray_20};
    }

    &:disabled {
      background-color: ${color.white_00};
      opacity: 0.4;
    }
  `,
  error: css`
    ${mixinDefaultButton};
    ${font.medium_14};
    border: 1px solid ${color.gray_20};
    color: ${color.red_50};
    background-color: ${color.gray_10};

    &:not(:disabled):hover {
      border: 1px solid ${color.gray_30};
      background-color: ${color.red_50};
      background-color: ${color.gray_20};
    }

    &:disabled {
      border: 1px solid ${color.gray_20};
      background-color: ${color.gray_10};
      opacity: 0.4;
    }
  `,

  filled_gray_blue: css`
    ${mixinOutlineButton};
    ${font.medium_13};
    color: ${color.blue_60};
    background-color: ${color.gray_10};

    &:not(:disabled):hover {
      background-color: ${color.gray_20};
    }

    &:disabled {
      background-color: ${color.gray_10};
      opacity: 0.4;
    }
  `,

  // TODO: ghost gray, blue, red button의 기본 font가 'regular_13' 인지 'regular_14'인지 확인 후 수정
  ghost: css`
    ${font.regular_14};
    position: relative;
    padding: 0;
    color: ${color.gray_70};
    text-decoration: underline;
    text-decoration-skip-ink: none;

    &:not(:disabled):hover {
      color: ${color.gray_80};

      svg > path {
        fill: ${color.gray_80};
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  `,

  ghost_blue: css`
    ${font.regular_14};
    position: relative;
    padding: 0;
    color: ${color.blue_60};
    text-decoration: underline;
    text-decoration-skip-ink: none;

    &:not(:disabled):hover {
      color: ${color.blue_90};

      svg > path {
        fill: ${color.blue_90};
      }
    }

    &:disabled {
      color: ${color.blue_60_10};
    }
  `,

  ghost_red: css`
    ${font.regular_14};
    position: relative;
    padding: 0;
    color: ${color.red_50};
    text-decoration: underline;
    text-decoration-skip-ink: none;

    &:not(:disabled):hover {
      color: ${color.red_50};

      svg > path {
        fill: ${color.red_50};
      }
    }

    &:disabled {
      color: ${color.red_20};
    }
  `,

  alert: css`
    ${font.medium_15};
    position: relative;
    padding: 0;
    color: ${color.gray_50};

    &:not(:disabled):hover {
      svg > path {
        fill: ${color.gray_70};
      }
      color: ${color.gray_70};

      &::before {
        background-color: ${color.gray_70};
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  `,

  alert_gray: css`
    ${font.medium_15};
    position: relative;
    padding: 0;
    color: ${color.gray_70};

    &:not(:disabled):hover {
      svg > path {
        fill: ${color.gray_80};
      }
      color: ${color.gray_80};

      &::before {
        background-color: ${color.gray_80};
      }
    }

    &:disabled {
      opacity: 0.6;
    }
  `,

  alert_blue: css`
    ${font.medium_15};
    position: relative;
    padding: 0;
    color: ${color.blue_60};

    &:not(:disabled):hover {
      svg > path {
        fill: ${color.blue_90};
      }
      color: ${color.blue_90};

      &::before {
        background-color: ${color.blue_90};
      }
    }

    &:disabled {
      color: ${color.blue_60_10};

      &::before {
        background-color: ${color.blue_60_10};
      }
    }
  `,

  alert_red: css`
    ${font.medium_15};
    position: relative;
    padding: 0;
    color: ${color.red_50};

    &:not(:disabled):hover {
      svg > path {
        fill: ${color.red_50};
      }
      color: ${color.red_50};

      &::before {
        background-color: ${color.red_50};
      }
    }

    &:disabled {
      color: ${color.red_20};

      &::before {
        background-color: ${color.red_20};
      }
    }
  `,
} as const;

export type ButtonTheme = typeof button;
