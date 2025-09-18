import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section<{ isTop10: boolean }>`
  ${({ isTop10 }) => css`
    position: fixed;
    bottom: 34px;
    min-width: 375px;
    width: 100%;
    padding: 0px 10px;
    text-align: ${isTop10 ? "end" : "start"};
  `}
`;

export const MyRankingButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    padding: 16px 10px;
    color: ${theme.color.white_00};
    background-color: ${theme.color.orange_50};
  `}
`;

export const MyRankingButtonContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: center;
  column-gap: 5px;
`;

export const MyRanking = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const MyRankginButtonNameAndOrderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 108px;
  align-items: center;
`;

export const MyName = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    display: -webkit-box;
    overflow: hidden;
    text-align: start;
    word-wrap: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  `}
`;

export const MyOrder = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_15};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const MyPrice = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_15};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const MyRankingButtonOrderPriceWrapper = styled.div`
  text-align: end;
`;

export const Top10Button = styled.button`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    width: 70px;
    height: 70px;
    border-radius: 40px;
    color: ${theme.color.white_00};
    background-color: ${theme.color.orange_50};
  `}
`;
