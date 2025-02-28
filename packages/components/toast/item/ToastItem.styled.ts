import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import type { Toast } from "@repo/types";

interface ToastItemProps {
  isClosing: boolean;
}

const scaleUp = keyframes`
  from { max-height: 0;}
  to {max-height: 100px;}
`;

const scaleDown = keyframes`
  from { max-height: 100px;}
  to { max-height: 0;}
 `;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-50%);}
  to { opacity: 1; transform: translateY(0)}
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0)}
  to { opacity: 0; transform: translateY(50%)}
 `;

export const ToastItem = styled.div<ToastItemProps>`
  ${({ isClosing }) => css`
    max-height: 0;
    overflow: visible;
    animation: 0.6s forwards ${isClosing ? scaleDown : scaleUp};

    & > div {
      animation: 0.3s forwards ${isClosing ? fadeOut : fadeIn};
    }
  `}
`;

export const Item = styled.div<{ toastType: Toast["type"] }>`
  ${({ theme, toastType }) => css`
    display: grid;
    grid-template-columns: 24px 1fr;
    column-gap: 12px;
    align-items: center;
    width: 320px;
    border-radius: 5px;
    padding: 20px 24px;
    background-color: ${theme.color.white};
    box-shadow: ${theme.boxShadow.shadow_medium};

    & > div {
      width: 100%;
      text-align: center;
    }

    & > p {
      ${theme.font.medium_14};
      color: ${theme.color.gray_70};
    }

    & svg {
      width: 24px;
      height: 24px;

      & > path {
        fill: ${toastType === "success"
          ? theme.color.green_20
          : theme.color.red_20};
      }
    }
  `}
`;
