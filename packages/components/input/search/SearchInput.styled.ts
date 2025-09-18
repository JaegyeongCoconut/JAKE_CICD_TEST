import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const INPUT_ASIDE_PADDING = 40;
const ICON_ASIDE_PADDING = 12;

export const Form = styled.form`
  position: relative;
  height: 50px;
`;

export const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${ICON_ASIDE_PADDING}px;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;

export const input = (hasValue: boolean) => (theme: Theme) => css`
  height: 100%;
  padding-right: ${hasValue ? INPUT_ASIDE_PADDING : ICON_ASIDE_PADDING}px;
  padding-left: ${INPUT_ASIDE_PADDING}px;

  &::placeholder {
    ${theme.font.regular_15};
    color: ${theme.color.gray_40};
  }
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: 50%;
    right: ${ICON_ASIDE_PADDING}px;
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
