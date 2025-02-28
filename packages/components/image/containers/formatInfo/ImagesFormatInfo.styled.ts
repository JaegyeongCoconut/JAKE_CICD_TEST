import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const FormatInfo = styled.ul`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    margin-top: 4px;
    color: ${theme.color.gray_60};
  `}
`;
