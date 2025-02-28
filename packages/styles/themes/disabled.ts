import { css } from "@emotion/react";

import { color } from "./color";

export const disabled = {
  default: css`
    /* NOTE: 모바일 브라우저에서도 disabled 상태일 때 동일할 수 있도록 설정 */
    background-color: ${color.gray_10};
    color: ${color.black};
    opacity: 1;
    cursor: not-allowed;

    & > svg > path {
      fill: ${color.gray_40};
    }
  `,
} as const;

export type DisabledType = typeof disabled;
