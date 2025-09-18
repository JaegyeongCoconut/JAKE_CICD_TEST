import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SelectedDates = styled.div<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    ${theme.font.regular_14};
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    min-height: 40px;
    margin-bottom: 12px;
    border: 1px solid ${theme.color.gray_30};
    padding: 9px 12px;
    color: ${isSelected ? theme.color.gray_90 : theme.color.gray_40};
    background-color: ${theme.color.gray_10};

    & > time {
      min-width: 113px;
      text-align: center;
    }
  `}
`;
