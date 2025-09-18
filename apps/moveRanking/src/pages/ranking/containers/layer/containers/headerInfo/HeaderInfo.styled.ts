import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export const DateInfo = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 218px;
    padding: 62px 0 30px;
    color: ${theme.color.gray_90};
    background-color: ${theme.color.gray_10};
  `}
`;

export const rankingHeaderLogoIcon = css`
  width: 104px;
  height: 25px;
  margin-bottom: 15px;
`;

export const DateInfoTitle = styled.h1`
  ${({ theme }) => css`
    ${theme.font.bold_20};
  `}
`;

export const DateInfoTimeWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.font.medium_15};
  `}
`;

export const RevenueInfo = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 162px;
    border-bottom: 8px solid ${theme.color.gray_20};
    padding: 20px 28px;
  `}
`;

export const RevenueInfoTitle = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    margin-bottom: 4px;
    color: ${theme.color.gray_90};
  `}
`;

export const RevenueInfoSubTitle = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_14};
    margin-bottom: 12px;
    color: ${theme.color.gray_60};
  `}
`;

export const RevenueContents = styled.div`
  display: grid;
  grid-template-columns: 160px 160px;
  justify-content: center;
`;

export const RevenueContentTitle = styled.p`
  ${({ theme }) => css`
    ${theme.font.regular_15};
    color: ${theme.color.gray_80};
  `}
`;

export const RevenueContentOrders = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    overflow: hidden;
    color: ${theme.color.gray_90};
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const RevenueContentPrice = styled.p`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    overflow: hidden;
    color: ${theme.color.red_70};
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const skeleton = (width: number) => css`
  width: ${width}px;
`;
