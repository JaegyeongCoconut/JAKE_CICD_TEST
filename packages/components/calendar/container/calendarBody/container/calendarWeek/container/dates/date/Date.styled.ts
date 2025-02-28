import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

const mixinCircle = css`
  border-radius: 22px;
`;

const mixinLeftCircle = css`
  border-radius: 22px 0 0 22px;
`;

const mixinRightCircle = css`
  border-radius: 0 22px 22px 0;
`;

const mixinSelectDate = (theme: Theme) => css`
  border-radius: 22px;
  background-color: ${theme.color.blue_10};

  > button {
    color: ${theme.color.white};
  }
`;

const mixinHoverDate = (theme: Theme) => css`
  background-color: ${theme.color.blue_10_10};
`;

interface RootProps {
  isToday: boolean;
  isThisMonth: boolean;
  isSelectedDate: boolean;
  isHoverLength: boolean;
  isLeftCircleCases: boolean;
  isRightCircleCases: boolean;
  isSelected: boolean;
}

export const Root = styled.li<RootProps>`
  ${({
    isToday,
    isThisMonth,
    isSelectedDate,
    isHoverLength,
    isLeftCircleCases,
    isRightCircleCases,
    isSelected,
    theme,
  }) => css`
    ${isSelectedDate && mixinSelectDate(theme)};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border: ${isToday && `1px solid ${theme.color.black}`};
    border-radius: ${(isToday || isSelected) && "50%"};

    & > button {
      color: ${!isThisMonth && theme.color.gray_50};
    }

    &:hover::after {
      ${!isSelected && mixinHoverDate(theme)};
      ${!isSelected && mixinCircle};
    }

    &::after {
      content: "";
      position: absolute;
      width: 40px;
      height: 36px;
      ${isHoverLength && mixinHoverDate(theme)};
      ${isLeftCircleCases && mixinLeftCircle};
      ${isRightCircleCases && mixinRightCircle};
      ${isLeftCircleCases && isRightCircleCases && mixinCircle};
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    width: 100%;
    height: 100%;
    color: ${theme.color.black};
    z-index: ${theme.zIndex.CALENDAR};

    &:disabled {
      color: ${theme.color.gray_50};
    }
  `}
`;
