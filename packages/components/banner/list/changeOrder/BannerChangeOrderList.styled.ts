import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PageSection = styled.section`
  ${({ theme }) => css`
    min-width: ${theme.size.SECTION_MIN_WIDTH};
    width: ${`calc(100vw - ${theme.size.NAV_WIDTH} - ${theme.size.MAIN_PADDING_SIDE} * 2)`};
    max-width: ${theme.size.SECTION_MAX_WIDTH};
    margin: 0 auto;
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    ${theme.font.bold_18};
    margin-bottom: 4px;
    color: ${theme.color.black};
  `}
`;

export const Desc = styled.h3`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_60};
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
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

export const BannerChangeOrderListSkeleton = styled.section`
  ${({ theme }) => css`
    @media ${theme.breakPoint.device.banner} {
      min-width: 321px;
    }
  `}
`;
