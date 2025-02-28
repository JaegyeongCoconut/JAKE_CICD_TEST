import React from "react";

import useDragDropBannerCard from "@repo/hooks/useDragDropBannerCard";
import type { BannerItem } from "@repo/types";

import BannerCard from "../BannerCard";

interface MovableBannerCardProps {
  banner: BannerItem;
  hoveredBannerInfo: { idx: number; isPrevDragging: boolean };
  changeHoveredBannerInfo: (idx: number, isPrev: boolean) => void;
  findBanner: (id: string) => { index: number };
  moveBanner: (id: string, to: number) => void;
}

const MovableBannerCard = ({
  banner,
  hoveredBannerInfo,
  changeHoveredBannerInfo,
  findBanner,
  moveBanner,
}: MovableBannerCardProps) => {
  const { isDragging, dragBannerCard, dropBannerCard } = useDragDropBannerCard(
    banner,
    hoveredBannerInfo,
    changeHoveredBannerInfo,
    findBanner,
    moveBanner,
  );

  return (
    <BannerCard
      isDragging={isDragging}
      banner={banner}
      hoveredBannerInfo={hoveredBannerInfo}
      dragBannerCard={dragBannerCard}
      dropBannerCard={dropBannerCard}
    />
  );
};

export default MovableBannerCard;
