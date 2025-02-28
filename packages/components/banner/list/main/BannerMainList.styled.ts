import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BannersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    ${theme.font.medium_16};
    margin-bottom: 2px;
    color: ${theme.color.black};
  `}
`;

export const Banners = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 28px;
    row-gap: 28px;

    @media ${theme.breakPoint.device.banner} {
      column-gap: 20px;
      grid-template-columns: repeat(4, 1fr);
    }
  `}
`;

export const BannerMainListSkeleton = styled.section`
  ${({ theme }) => css`
    @media ${theme.breakPoint.device.banner} {
      min-width: 321px;
    }
  `}
`;
