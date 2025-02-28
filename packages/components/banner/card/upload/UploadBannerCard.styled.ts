import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface DraggingProps {
  isDragging: boolean;
}

export const BannerUpload = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 154px;
  margin-bottom: 4px;

  & > input {
    display: none;
  }
`;

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    border: 1px solid ${theme.color.gray_30};
  `}
`;

export const FileUploadWrapper = styled.div<DraggingProps>`
  ${({ theme, isDragging }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: ${isDragging
      ? `2px solid ${theme.color.blue_10}`
      : `1px solid ${theme.color.gray_30}`};
    border-radius: ${isDragging && "2px"};
    background-color: ${theme.color.gray_10};

    & > p {
      ${theme.font.regular_13};
      margin-bottom: 16px;
      color: ${theme.color.gray_60};
      text-align: center;
    }

    & > input {
      display: none;
    }
  `}
`;

export const FileUploadLabel = styled.label`
  ${({ theme }) => css`
    ${theme.button.ghost_blue};
    cursor: pointer;
  `}
`;

export const FileUpdateLabel = styled.label`
  ${({ theme }) => css`
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 2px;
    background-color: ${theme.color.black_50};
    cursor: pointer;

    &:hover {
      background-color: ${theme.color.black_70};
    }
  `}
`;

export const pencilIcon = (theme: Theme) => css`
  width: 24px;

  & > path {
    fill: ${theme.color.white};
  }
`;

export const uploadIcon = (theme: Theme) => css`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;

  & > path {
    fill: ${theme.color.gray_40};
  }
`;

export const BannerPreviewImg = styled.img<DraggingProps>`
  ${({ theme, isDragging }) => css`
    width: 100%;
    height: 100%;
    border: ${isDragging && `2px solid ${theme.color.blue_10}`};
    border-radius: 2px;
    object-fit: scale-down;
  `}
`;
