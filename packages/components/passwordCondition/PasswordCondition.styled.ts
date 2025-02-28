import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PasswordConditionWrapper = styled.div`
  display: flex;
  flex-flow: column;
  row-gap: 4px;
`;

interface PasswordConditionProps {
  hasError?: boolean;
}

export const PasswordCondition = styled.div<PasswordConditionProps>`
  ${({ theme, hasError }) => css`
    ${theme.font.regular_13}
    display: flex;
    align-items: center;
    column-gap: 6px;

    color: ${hasError === true
      ? theme.color.red_20
      : hasError === false
        ? theme.color.green_20
        : theme.color.gray_60};

    & > svg {
      width: 12px;
      height: 12px;

      & > path {
        fill: ${hasError === true
          ? theme.color.red_20
          : hasError === false
            ? theme.color.green_20
            : theme.color.gray_60};
      }
    }
  `}
`;
