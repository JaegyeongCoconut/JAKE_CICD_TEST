import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Li = styled.li<{ isCurrentDriverRank?: boolean }>`
  ${({ theme, isCurrentDriverRank }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 92px;
    border-bottom: 1px solid ${theme.color.gray_20};
    padding: 20px;
    text-align: center;
    background-color: ${isCurrentDriverRank
      ? theme.color.orange_10
      : theme.color.white};
  `}
`;

export const icon = css`
  width: 30px;
  height: 39px;
`;

export const LiContent = styled.div`
  ${({ theme }) => css`
    display: grid;
    align-items: center;
    grid-template-columns: 30px 1fr;
    column-gap: 15px;
    color: ${theme.color.black};
  `}
`;

export const LiContentTextWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 192px 98px;
  text-align: start;
`;

export const LiContentName = styled.p`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    display: -webkit-box;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `}
`;

export const LiContentOrderAndPriceWrapper = styled.div`
  text-align: end;
`;

export const LiContentOrder = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_15};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const LiContentPrice = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_15};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const skeleton = (width: number) => css`
  width: ${width}px;
`;
