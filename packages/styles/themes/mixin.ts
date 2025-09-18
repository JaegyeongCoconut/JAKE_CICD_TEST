import { css } from "@emotion/react";

import { color } from "./color";
import { size } from "./size";

export const mixin = {
  horizontalScrollbar: css`
    display: block;
    height: ${`calc(${size.TABLE_HEIGHT} + ${size.SCROLL_BAR_HEIGHT})`};
    overflow-x: auto;

    & > thead {
      position: static;
    }

    & > tbody {
      height: ${size.TABLE_BODY_HEIGHT};
    }

    ::-webkit-scrollbar {
      width: ${size.SCROLL_BAR_WIDTH};
      height: ${size.SCROLL_BAR_HEIGHT};
      background-color: ${color.gray_20};
    }

    ::-webkit-scrollbar-thumb {
      margin-right: 2px;
      border-radius: 100px;
      background-color: ${color.gray_40};
    }
  `,
};

export type MixinType = typeof mixin;
