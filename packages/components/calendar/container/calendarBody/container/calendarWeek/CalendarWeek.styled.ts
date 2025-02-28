import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const WeekRow = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(7, 40px);
    row-gap: 4px;
    margin-bottom: 12px;

    > li {
      ${theme.font.regular_12};
      color: ${theme.color.gray_70};
      text-align: center;
    }
  `}
`;

export const DateRow = styled.ul`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 40px);
    row-gap: 4px;
    margin-bottom: 16px;
    color: ${theme.color.gray_70};
  `}
`;

export const CircleBox = styled.div`
  ${({ theme }) => css`
    width: 12px;
    height: 12px;
    border: 1px solid ${theme.color.gray_70};
    border-radius: 50%;
  `}
`;

export const todayButton = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 4px;
  width: 100%;
  margin-bottom: 12px;
  color: ${theme.color.gray_70};
  text-decoration: underline;
`;
