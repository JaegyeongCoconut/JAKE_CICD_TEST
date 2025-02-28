import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Time = styled.time<{ isTimeOver: boolean }>`
  ${({ theme, isTimeOver }) => css`
    ${theme.font.regular_13};
    display: inline-block;
    color: ${isTimeOver ? theme.color.red_20 : theme.color.blue_10};
  `}
`;
