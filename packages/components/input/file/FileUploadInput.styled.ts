import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const FileInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 500px;
  margin-bottom: 4px;
`;

interface LabelProps {
  disabled: boolean;
  hasError: boolean;
}

export const FileInput = styled.div<LabelProps>`
  ${({ theme, hasError, disabled }) => css`
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    border: 1px solid ${hasError ? theme.color.red_50 : theme.color.gray_30};
    background-color: ${disabled ? theme.color.gray_10 : theme.color.white_00};

    :hover {
      cursor: ${disabled ? "not-allowed" : "cursor"};
    }

    & > div :hover {
      cursor: ${disabled ? "not-allowed" : "cursor"};
    }
  `}
`;

export const FileButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    margin-left: auto;
    border-left: 1px solid ${theme.color.gray_30};
  `}
`;

export const FileInputPlaceholder = styled.span<{ isFileAttached: boolean }>`
  ${({ theme, isFileAttached }) => css`
    ${theme.font.regular_14};
    padding: 9px 12px;
    color: ${isFileAttached ? theme.color.gray_90 : theme.color.gray_40};
  `}
`;

export const FileUploadButton = styled.label`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    :hover {
      background-color: ${theme.color.gray_10};
      cursor: pointer;
    }

    > input {
      display: none;
    }
  `}
`;

export const DeleteButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    :hover {
      background-color: ${theme.color.gray_10};
      cursor: pointer;
    }

    > svg {
      width: 20px;
      height: 20px;
    }
  `}
`;

export const trashIcon = (theme: Theme) => css`
  & > path {
    fill: ${theme.color.gray_60};
  }
`;

export const FileInputInfo = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_60};
  `}
`;

export const uploadIcon = (theme: Theme) => css`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;
