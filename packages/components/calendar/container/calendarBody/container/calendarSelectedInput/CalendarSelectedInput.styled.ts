import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SelectedDates = styled.div<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    min-height: 40px;
    margin-bottom: 12px;
    border: 1px solid ${theme.color.gray_30};
    padding: 9px 12px;
    background-color: ${theme.color.gray_10};
    color: ${isSelected ? theme.color.black : theme.color.gray_40};

    & > time {
      min-width: 113px;
      text-align: center;
    }
  `}
`;
