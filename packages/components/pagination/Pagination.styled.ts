import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Pagination = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 72px;
    border: 1px solid ${theme.color.gray_20};
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
`;

export const ArrowButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 2px;

    svg {
      width: 16px;
      height: 16px;

      & > path {
        fill: ${theme.color.gray_50};
      }
    }

    :hover:not([disabled]) {
      background-color: ${theme.color.gray_30};

      svg > path {
        fill: ${theme.color.gray_60};
      }
    }

    &[disabled] {
      svg > path {
        fill: ${theme.color.gray_30};
      }
    }
  `}
`;

export const chevronLeftIcon = css`
  transform: rotate(90deg);
`;

export const chevronRightIcon = css`
  transform: rotate(-90deg);
`;

export const chevronDoubleRightIcon = css`
  transform: rotate(-180deg);
`;

export const NumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface NumberButtonProps {
  isCurrentPage: boolean;
}

export const NumberButton = styled.button<NumberButtonProps>`
  ${({ theme, isCurrentPage }) => css`
    ${theme.font.regular_14}
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    padding: 5px;
    border-radius: 2px;
    color: ${isCurrentPage ? theme.color.black : theme.color.gray_50};
    background-color: ${isCurrentPage
      ? theme.color.gray_10
      : theme.color.white};

    :hover:not([disabled]) {
      background-color: ${theme.color.gray_30};

      svg {
        fill: ${theme.color.gray_60};
      }
    }
  `}
`;
