import React from "react";

import { ConnectDragSource, ConnectDropTarget } from "react-dnd";
import Skeleton from "react-loading-skeleton";

import { BANNER_LINK_RADIOS, BANNER_STATUS_LIST } from "@repo/assets/static";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { BannerItem, Languages } from "@repo/types";
import { findLookupTableLabel } from "@repo/utils/method";

import * as S from "./BannerCard.styled";

interface BaseBannerCarProps {
  children?: React.ReactNode;
  banner: BannerItem;
}
interface BannerCardProps extends BaseBannerCarProps {
  isDragging?: never;
  hoveredBannerInfo?: never;
  dragBannerCard?: never;
  dropBannerCard?: never;
  handleBannerClick: () => void;
}

interface MovableBannerCardProps extends BaseBannerCarProps {
  isDragging: boolean;
  hoveredBannerInfo: { idx: number; isPrevDragging: boolean };
  dragBannerCard: ConnectDragSource;
  dropBannerCard: ConnectDropTarget;
  handleBannerClick?: never;
}

const BannerCard = ({
  children,
  isDragging,
  banner,
  hoveredBannerInfo,
  dragBannerCard,
  dropBannerCard,
  handleBannerClick,
}: BannerCardProps | MovableBannerCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { idx, isActive, color } = banner;

  const isMoveableState = !!(dropBannerCard && dragBannerCard);
  const isHoveredCard = idx === hoveredBannerInfo?.idx;

  return (
    <S.BannerCard
      ref={
        isMoveableState ? (node) => dragBannerCard(dropBannerCard(node)) : null
      }
      role="button"
      tabIndex={0}
      isDragging={isDragging ?? false}
      isHoveredCard={isHoveredCard ?? false}
      isPrevDragging={hoveredBannerInfo?.isPrevDragging ?? false}
      isMoveableState={isMoveableState ?? false}
      onClick={handleBannerClick}
    >
      <S.Header>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Order")}</S.Label>
          <S.Text>{idx + 1}</S.Text>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Status")}</S.Label>
          <S.BannerStatus isActive={isActive}>
            {defaultLanguage(
              findLookupTableLabel(
                BANNER_STATUS_LIST,
                banner.status,
              ) as Languages,
            )}
          </S.BannerStatus>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Linked")}</S.Label>
          <S.Text>
            {banner.linkType
              ? defaultLanguage(
                  findLookupTableLabel(
                    BANNER_LINK_RADIOS,
                    banner.linkType,
                  ) as Languages,
                )
              : "-"}
          </S.Text>
        </S.InfoWrapper>
      </S.Header>
      <S.BannerImgWrapper bgColor={`#${color.replace("#", "")}`}>
        {banner.isLoading ? (
          <Skeleton width="100%" height="100%" />
        ) : (
          <S.BannerImg
            src={banner.imageUrl}
            alt="banner-image"
            draggable={false}
          />
        )}
      </S.BannerImgWrapper>
      {children}
    </S.BannerCard>
  );
};

export default BannerCard;
