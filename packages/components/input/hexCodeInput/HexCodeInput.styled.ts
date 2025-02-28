import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HexCodeInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  column-gap: 8px;
  width: 100%;
`;

export const HexCodeInputContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const HexCodeUnit = styled.span`
  position: absolute;
  top: 9px;
  left: 12px;
`;

export const input = css`
  padding-left: 34px;
  width: 100%;
`;

export const BackgroundColorBox = styled.div<{
  color: string;
  hasColor: boolean;
}>`
  ${({ theme, color, hasColor }) => css`
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border: 1px solid ${theme.color.gray_20};
    border-radius: 8px;
    background-color: ${hasColor ? `#${color}` : theme.color.white};
  `}
`;

export const errorMessage = css`
  margin-top: 4px;
`;
