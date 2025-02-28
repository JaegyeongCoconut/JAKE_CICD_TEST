import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const Form = styled.form`
  ${({ theme }) => css`
    position: relative;
    height: 50px;
    border: 0;
    border-bottom: 1px solid ${theme.color.gray_20};
  `}
`;

interface IconButtonProps {
  iconAsidePadding: number;
}

export const SearchButton = styled.button<IconButtonProps>`
  ${({ iconAsidePadding }) => css`
    position: absolute;
    top: 50%;
    left: ${iconAsidePadding}px;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
  `}
`;

interface InputProps {
  hasValue: boolean;
  inputAsidePadding: number;
  iconAsidePadding: number;
}

export const input =
  ({ hasValue, inputAsidePadding, iconAsidePadding }: InputProps) =>
  (theme: Theme) => css`
    height: 100%;
    /* TODO: 레이아웃 쉬프트 일어남, 페이지 레이아웃 잡을 때 보더 속성 확인해야함 */
    border: 1px solid ${theme.color.white};
    padding-left: ${inputAsidePadding}px;
    padding-right: ${hasValue ? inputAsidePadding : iconAsidePadding}px;

    &::placeholder {
      ${theme.font.regular_15};
      color: ${theme.color.gray_40};
    }
  `;

export const CloseButton = styled.button<IconButtonProps>`
  ${({ theme, iconAsidePadding }) => css`
    position: absolute;
    top: 50%;
    right: ${iconAsidePadding}px;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);

    svg {
      width: 20px;
      height: 20px;

      & > path {
        fill: ${theme.color.gray_60};
      }
    }
  `}
`;

export const searchIcon = (theme: Theme) => css`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${theme.color.gray_60};
  }
`;
