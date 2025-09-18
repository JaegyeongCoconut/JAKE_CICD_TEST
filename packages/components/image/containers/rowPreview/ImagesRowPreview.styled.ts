import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const trashButton = (theme: Theme) => css`
  & > svg {
    width: 20px;
    height: 20px;

    & > path {
      fill: ${theme.color.gray_40};
    }
  }
`;

export const PreviewImgWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_12};
    display: grid;
    grid-template-columns: 106px 1fr;
    align-items: center;
    column-gap: 16px;
    color: ${theme.color.gray_80};
  `}
`;

export const PreviewRow = styled.li`
  ${({ theme }) => css`
    ${theme.font.regular_12};
    display: grid;
    grid-template-columns: 40px 1fr 36px;
    align-items: center;
    padding: 4px 0;
    color: ${theme.color.gray_80};
  `}
`;

export const ProviewImageName = styled.span`
  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const image = (isLoading: boolean) => (theme: Theme) => css`
  display: ${isLoading ? "none" : "block"};
  width: 106px;
  height: 60px;
  border: 1px solid ${theme.color.gray_20};
  border-radius: 8px;
  object-fit: cover;
`;
