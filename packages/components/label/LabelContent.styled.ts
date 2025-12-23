import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface WrapperProps {
  columnWidth: number | undefined;
  direction: "horizontal" | "vertical";
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ direction, columnWidth }) => css`
    display: grid;
    grid-template-columns: ${columnWidth && `${columnWidth}px 1fr`};
    align-items: ${direction === "horizontal" && "center"};
    row-gap: ${direction === "vertical" && "4px"};
  `}
`;

export const LabelWrapper = styled.div`
  display: flex;
  column-gap: 4px;
`;

export const Label = styled.label<{ isRequired: boolean }>`
  ${({ theme, isRequired }) => css`
    ${theme.font.medium_13};
    position: relative;
    color: ${theme.color.gray_70};

    &::after {
      content: ${isRequired ? "'*'" : null};
      margin-left: 4px;
      color: ${theme.color.red_50};
    }
  `}
`;
