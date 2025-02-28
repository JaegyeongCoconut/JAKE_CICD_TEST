import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface RootProps {
  as?: string;
  dialogPosition: "up" | "down";
}

const CALENDAR_HEIGHT = "522px";

export const Root = styled.dialog<RootProps>`
  ${({ theme, as, dialogPosition }) => css`
    position: ${as === "dialog" ? "absolute" : "static"};
    top: ${dialogPosition === "up"
      ? `calc(-${CALENDAR_HEIGHT} - 4px)`
      : "calc(100% + 4px)"};
    width: 320px;
    height: ${CALENDAR_HEIGHT};
    border: 1px solid ${theme.color.gray_20};
    border-radius: 5px;
    background-color: ${theme.color.white};
    box-shadow: ${theme.boxShadow.shadow_regular};
    z-index: ${theme.zIndex.CALENDAR};
  `}
`;

export const Body = styled.div`
  padding: 16px 20px 20px 20px;
`;
