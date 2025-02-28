import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 20px 20px 12px 20px;
  `}
`;

export const MonthYear = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    column-gap: 4px;

    & > time {
      ${theme.font.medium_16};
      color: ${theme.color.black};
    }
  `}
`;

export const MonthYearContent = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    column-gap: 4px;
    height: 48px;

    time {
      ${theme.font.medium_15};
    }
  `}
`;

export const OpenMonthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

export const MoveButtonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 4px;
`;

const chevronIcon = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  padding: 4px;

  & > path {
    fill: ${theme.color.gray_70};
  }

  :hover {
    border-radius: 8px;
    background-color: ${theme.color.gray_10};
  }
`;

export const chevronMonthIcon =
  (isOpenMonthDialog: boolean) => (theme: Theme) => css`
    ${chevronIcon(theme)};
    width: 24px;
    height: 24px;
    transform: ${isOpenMonthDialog && "rotate(180deg)"};
  `;

export const chevronNextButton = (deg: 90 | -90) => (theme: Theme) => css`
  & > svg {
    ${chevronIcon(theme)};
  }
  transform: rotate(${deg}deg);
`;
