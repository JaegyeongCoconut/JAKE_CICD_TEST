import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section<{ isTop10: boolean }>`
  ${({ isTop10 }) => css`
    position: fixed;
    bottom: 34px;
    width: 100%;
    min-width: 375px;
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
    background-color: ${theme.color.orange_30};
    color: ${theme.color.white};
  `}
`;

export const MyRankingButtonContentWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 32px 1fr;
  column-gap: 5px;
`;

export const MyRanking = styled.span`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const MyRankginButtonNameAndOrderWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 108px;
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
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const MyPrice = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_15};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: ${theme.color.orange_30};
    color: ${theme.color.white};
  `}
`;
