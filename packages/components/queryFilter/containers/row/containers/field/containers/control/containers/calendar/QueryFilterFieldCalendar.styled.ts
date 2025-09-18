import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterFieldCalendarWrapper = styled.div<{
  disabled?: boolean;
}>`
  ${({ disabled }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 4px 0;

    & > div > button {
      background-color: ${disabled && "transparent"};
    }
  `}
`;

export const dropdown = (disabled: boolean) => (theme: Theme) => css`
  position: relative;
  min-width: 150px;
  padding: 0 20px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 18px;
    background-color: ${theme.color.gray_30};
    transform: translateY(-50%);
  }

  && > button {
    ${theme.font.regular_13}
    border: 0;
    padding: 0;

    ${disabled &&
    css`
      background-color: ${theme.color.gray_20};

      & > span {
        color: ${theme.color.gray_40};
      }
    `}
  }

  & > ul {
    left: 10px;
    width: calc(100% - 20px);

    & > li > button {
      ${theme.font.regular_13};
    }
  }

  & + div {
    width: 100%;
  }
`;

export const calendar = css`
  width: 100%;
  height: 100%;

  & > input {
    border: 0;
    padding-left: 20px;
  }
`;
