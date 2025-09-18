import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const CalendarButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.color.blue_60};
  `}
`;
