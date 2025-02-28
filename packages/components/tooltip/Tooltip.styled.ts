import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

import type { TooltipPosition } from "@repo/types";

export const Tooltip = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;

  &:hover > div {
    visibility: visible;
  }
`;

export const tooltipIcon = (theme: Theme) => css`
  & > path {
    fill: ${theme.color.gray_50};
  }
`;

interface ContainerProps {
  position: TooltipPosition;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, position }) => css`
    position: absolute;
    top: ${position === "BOTTOM_LEFT" || position === "BOTTOM_RIGHT"
      ? "calc(100% + 14px)"
      : "auto"};
    bottom: ${position === "TOP_LEFT" || position === "TOP_RIGHT"
      ? "calc(100% + 14px)"
      : "auto"};
    left: ${position === "TOP_LEFT" || position === "BOTTOM_LEFT"
      ? "-72px"
      : "auto"};
    right: ${position === "TOP_RIGHT" || position === "BOTTOM_RIGHT"
      ? "-72px"
      : "auto"};
    width: 300px;
    border-radius: 2px;
    padding: 10px 16px;
    color: ${theme.color.white};
    background-color: ${theme.color.gray_80};
    visibility: hidden;
    z-index: 1;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: ${position === "TOP_LEFT" || position === "BOTTOM_LEFT"
        ? "72px"
        : "auto"};
      right: ${position === "TOP_RIGHT" || position === "BOTTOM_RIGHT"
        ? "72px"
        : "auto"};
      display: block;
      width: 0;
      height: 0;
      border-top: ${position === "TOP_LEFT" || position === "TOP_RIGHT"
          ? "12px"
          : "-12px"}
        solid ${theme.color.gray_80};
      border-bottom: ${position === "TOP_LEFT" || position === "TOP_RIGHT"
          ? "-12px"
          : "12px"}
        solid transparent;
      border-left: 7.5px solid transparent;
      border-right: 7.5px solid transparent;
    }

    &::before {
      top: ${position === "TOP_LEFT" || position === "TOP_RIGHT"
        ? "100%"
        : "auto"};
      bottom: ${position === "BOTTOM_LEFT" || position === "BOTTOM_RIGHT"
        ? "100%"
        : "auto"};
      border-bottom-color: ${theme.color.gray_80};
      z-index: -1;
    }

    &::after {
      top: ${position === "TOP_LEFT" || position === "TOP_RIGHT"
        ? "100%"
        : "auto"};
      bottom: ${position === "BOTTOM_LEFT" || position === "BOTTOM_RIGHT"
        ? "100%"
        : "auto"};
      border-bottom-color: ${theme.color.gray_80};
    }
  `}
`;

export const Message = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_12};
    white-space: break-spaces;
    word-break: break-word;
  `}
`;
