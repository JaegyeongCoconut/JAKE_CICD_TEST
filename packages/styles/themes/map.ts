import { css } from "@emotion/react";

import { boxShadow } from "./boxShadow";
import { color } from "./color";
import { font } from "./font";

const commonInfoWindow = css`
  .gm-style-iw-chr {
    display: none !important;
  }

  > div {
    overflow: auto !important;
  }

  button {
    display: none !important;
  }

  ~ div {
    display: none;
  }
`;

export const infoWindow = {
  location: css`
    // NOTE: Map Pick-up, Drop-off Marker css
    .location-info-window {
      display: flex;
      align-items: center;
      column-gap: 8px;

      & > img {
        width: 28px;
        height: 28px;
      }

      & > span {
        ${font.medium_15};
        color: ${color.gray_90};
      }
    }

    .gm-style-iw-c:has(.location-info-window) {
      ${commonInfoWindow};
      border: 1px solid ${color.gray_40};
      border-radius: 100px;
      padding: 4px 12px 4px 4px !important;
      box-shadow: none;
    }
  `,
  fixedPoint: css`
    // NOTE: Map Standing point, Swapping point Marker css
    .fixed-point-info-window {
      display: flex;
      align-items: center;
      column-gap: 8px;

      & > img {
        width: 18px;
        height: 18px;
      }

      & .wrapper {
        width: 100%;

        .name {
          ${font.medium_15};
          display: flex;
          align-items: center;
        }

        & > div {
          display: flex;
          flex-direction: column;
          row-gap: 4px;
          margin-top: 8px;

          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .info-label {
              display: flex;
              align-items: center;
              column-gap: 8px;

              & > span {
                ${font.regular_14};
                color: ${color.gray_70};
              }

              & > img {
                width: 16px;
                height: 16px;
              }
            }
            .info-value {
              ${font.regular_14};
              color: ${color.gray_90};
            }
          }
        }
      }
    }

    .gm-style-iw-c:has(.fixed-point-info-window) {
      ${commonInfoWindow};
      position: absolute;
      width: 270px;
      border: 1px solid ${color.gray_30};
      border-radius: 5px;
      padding: 16px 20px !important;
      box-shadow: ${boxShadow.shadow_regular};

      // NOTE: custom 버튼 만들어서 정보창 닫는 Handler를 적용하는 것에 이슈가 있어 기본 제공하는 버튼을 커스텀
      & > button {
        top: 8px !important;
        right: 8px !important;
        display: block !important;
        width: 18px !important;
        height: 18px !important;

        > span {
          width: 18px !important;
          height: 18px !important;
          margin: 0 !important;
          background-color: ${color.gray_50};
          -webkit-mask-size: 18px;
        }
      }
    }
  `,
  branch: css`
    .branch-info-window {
      display: flex;
      align-items: center;
      column-gap: 8px;

      & > .branch-index {
        ${font.medium_15};
        width: 28px;
        height: 28px;
        border-radius: 100px;
        color: ${color.white_00};
        text-align: center;
        background-color: ${color.gray_80};
      }

      & > .branch-code {
        ${font.medium_15};
        color: ${color.gray_90};
      }
    }
    .gm-style-iw-c:has(.branch-info-window) {
      ${commonInfoWindow};
      border: 1px solid ${color.gray_40};
      border-radius: 100px;
      padding: 4px 12px 4px 4px !important;
      box-shadow: none;
    }
  `,
};

export type InfoWindow = typeof infoWindow;
