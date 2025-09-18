import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MonthWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 16px;
  padding: 0 21px;

  & > li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
  }
`;

export const MonthButton = styled.button<{
  isCurrent: boolean;
  isSelected: boolean;
}>`
  ${({ theme, isCurrent, isSelected }) => css`
    ${theme.font.regular_14};
    width: 100%;
    height: 100%;
    border: ${isCurrent && `1px solid ${theme.color.gray_90}`};
    border-radius: 100px;
    color: ${isSelected ? theme.color.white_00 : theme.color.gray_90};
    background-color: ${isSelected && theme.color.blue_60};

    &:hover {
      background-color: ${!isSelected &&
      (isCurrent ? theme.color.gray_10 : theme.color.blue_60_10)};
    }
  `}
`;
