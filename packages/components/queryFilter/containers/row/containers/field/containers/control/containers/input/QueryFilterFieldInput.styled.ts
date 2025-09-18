import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const QueryFilterFieldInputWrapper = styled.form`
  position: relative;
  width: 100%;
  padding: 13px 20px;
`;

export const input = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0 60px 0 0;

  :focus {
    border: 0;
  }

  ::placeholder {
    color: ${theme.color.gray_40};
  }

  &:disabled {
    background-color: inherit;
  }
`;

export const QueryFilterFieldInputApplyButton = styled.button`
  ${({ theme }) => css`
    ${theme.font.medium_13};
    position: absolute;
    top: 50%;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 28px;
    border-radius: 4px;
    color: ${theme.color.blue_60};
    background-color: ${theme.color.gray_10};
    transform: translateY(-50%);
  `}
`;
