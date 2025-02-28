import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const customRadioButton = css`
  column-gap: 32px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const LinkedType = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.black};
  `}
`;

export const LinkedContent = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    color: ${theme.color.gray_60};
    word-break: break-all;
  `}
`;

interface BannerImgProps {
  bgColor: string;
}

export const BannerImg = styled.img<BannerImgProps>`
  ${({ bgColor }) => css`
    width: 343px;
    height: 106px;
    background-color: ${bgColor};
    object-fit: scale-down;
  `}
`;

export const BackgroundColorBox = styled.div<{ bgColor: string }>`
  ${({ theme, bgColor }) => css`
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border: 1px solid ${theme.color.gray_20};
    border-radius: 8px;
    background-color: ${bgColor};
  `}
`;
