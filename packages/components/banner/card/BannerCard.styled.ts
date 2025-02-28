import { css, type Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface BannerProps {
  isDragging: boolean;
  isHoveredCard: boolean;
  isPrevDragging: boolean;
  isMoveableState: boolean;
}

const card = (theme: Theme) => css`
  min-width: 413px;
  height: 232px;
  border: 1px solid ${theme.color.gray_30};
  border-radius: 2px;
  padding: 27px;

  @media ${theme.breakPoint.device.banner} {
    min-width: 321px;
  }
`;

export const BannerCard = styled.div<BannerProps>`
  ${({
    isDragging,
    isHoveredCard,
    isPrevDragging,
    isMoveableState,
    theme,
  }) => css`
    ${card(theme)};
    position: relative;
    opacity: ${isDragging ? 0 : 1};
    background-color: ${theme.color.white};
    cursor: ${isMoveableState ? (isDragging ? "grabbing" : "grab") : "pointer"};

    &:hover {
      box-shadow: ${theme.boxShadow.shadow_medium};
    }

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: ${isPrevDragging && "-17px"};
      right: ${!isPrevDragging && "-17px"};
      display: ${isHoveredCard ? "block" : "none"};
      border-radius: 100px;
      width: 4px;
      height: 100%;
      background-color: ${theme.color.blue_10_30};

      @media ${theme.breakPoint.device.banner} {
        left: ${isPrevDragging && "-13px"};
        right: ${!isPrevDragging && "-13px"};
      }
    }
  `}
`;

export const BannerSkeletonCard = styled.div`
  ${({ theme }) => css`
    ${card(theme)};
  `}
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const InfoWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    row-gap: 4px;
    width: 100px;

    :not(:last-of-type)::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 20px;
      background-color: ${theme.color.gray_20};
      transform: translateY(-50%);
    }
  `}
`;

export const Label = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_13};
    color: ${theme.color.gray_60};
  `}
`;

export const Text = styled.span`
  ${({ theme }) => css`
    ${theme.font.regular_14};
  `}
`;

export const BannerStatus = styled.span<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    ${theme.font.medium_14};
    color: ${isActive ? theme.color.green_20 : theme.color.gray_60};
  `}
`;

export const BannerImgWrapper = styled.div<{ bgColor: string }>`
  ${({ bgColor }) => css`
    background-color: ${bgColor};
    aspect-ratio: 1300/400;
    min-height: 0;
  `}
`;

export const bannerImg = css`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  object-fit: scale-down;
`;

export const BannerImg = styled.img`
  ${bannerImg}
`;
