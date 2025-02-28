import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const baseModal = css`
  width: 800px;
  padding: 32px;
`;

export const DetailHeader = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  ${({ theme }) => css`
    ${theme.font.bold_24};
    margin-bottom: 4px;
  `}
`;

export const DetailDesc = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_60};
  `}
`;

export const DetailContent = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    margin-bottom: 32px;
    color: ${theme.color.gray_60};
  `}
`;

export const DetailFooter = styled.div`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    display: flex;
    justify-content: flex-end;
    column-gap: 32px;
  `}
`;

interface DetailInfoFooterProps {
  isButtonFloat?: boolean;
}

export const DetailInfoFooter = styled.div<DetailInfoFooterProps>`
  ${({ theme, isButtonFloat }) => css`
    ${theme.font.regular_13};
    position: ${isButtonFloat && "sticky"};
    left: ${isButtonFloat && "0"};
    bottom: ${isButtonFloat && "-32px"};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${isButtonFloat && "100%"};
    background-color: ${isButtonFloat && theme.color.white};
    z-index: ${isButtonFloat && theme.zIndex.MODAL + 1};

    & > div {
      display: flex;
      column-gap: 12px;
    }
  `}
`;

export const detailInfoGoNextLink = (theme: Theme) => css`
  ${theme.button.primary};
`;
