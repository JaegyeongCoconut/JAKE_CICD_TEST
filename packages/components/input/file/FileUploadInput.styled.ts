import { css, type Theme } from "@emotion/react";
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
  hasError: boolean;
  disabled: boolean;
}

export const FileInput = styled.div<LabelProps>`
  ${({ theme, hasError, disabled }) => css`
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    border: 1px solid ${hasError ? theme.color.red_20 : theme.color.gray_30};
    background-color: ${disabled ? theme.color.gray_10 : theme.color.white};

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
    align-items: center;
    justify-content: center;
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
    color: ${isFileAttached ? theme.color.black : theme.color.gray_40};
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
      cursor: pointer;
      background-color: ${theme.color.gray_10};
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
      cursor: pointer;
      background-color: ${theme.color.gray_10};
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
