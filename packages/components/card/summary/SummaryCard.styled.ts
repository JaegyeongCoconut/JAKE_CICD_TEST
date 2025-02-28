import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SummaryCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
    width: 400px;
    height: 72px;
    padding: 0 20px;
    background-color: ${theme.color.gray_10};
  `}
`;

export const Title = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_50};
  `}
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryCardSkeleton = styled.div`
  ${({ theme }) => css`
    display: flex;

    & > div:not(:last-of-type) {
      border-right: 1px solid ${theme.color.gray_20};
    }
  `}
`;
