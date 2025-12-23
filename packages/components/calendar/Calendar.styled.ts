import { css } from "@emotion/react";
import styled from "@emotion/styled";

const CALENDAR_HEIGHT = "522px";

export const Root = styled.dialog<{ dialogPosition: "up" | "down" | "center" }>`
  ${({ theme, dialogPosition }) => css`
    position: absolute;
    top: ${dialogPosition === "up"
      ? `calc(-${CALENDAR_HEIGHT} - 4px)`
      : dialogPosition === "center"
        ? `calc(-${CALENDAR_HEIGHT} / 2.5)`
        : "calc(100% + 4px)"};
    width: 320px;
    height: ${CALENDAR_HEIGHT};
    border: 1px solid ${theme.color.gray_20};
    border-radius: 5px;
    box-shadow: ${theme.boxShadow.shadow_regular};
    background-color: ${theme.color.white_00};
    z-index: ${theme.zIndex.CALENDAR};
  `}
`;

export const Body = styled.div`
  padding: 16px 20px 20px 20px;
`;
