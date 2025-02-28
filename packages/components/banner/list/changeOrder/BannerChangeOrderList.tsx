import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { BannerItem } from "@repo/types";

import * as S from "./BannerChangeOrderList.styled";
import Button from "../../../button/Button";
import InternalLinkButton from "../../../button/link/internalLinkButton/InternalLinkButton";
import MovableBannerCard from "../../card/movable/MovableBannerCard";
import NoBannerData from "../../noData/NoBannerData";

interface BannerChangeOrderListProps {
  banners: BannerItem[];
  createBannerPath: string;
  cancelBannerPath: string;
  isLoading: boolean;
  hoveredBannerInfo: { idx: number; isPrevDragging: boolean };
  handleUpdateClick: () => void;
  changeHoveredBannerInfo: (idx: number, isPrev: boolean) => void;
  findBanner: (id: string) => { index: number };
  moveBanner: (id: string, to: number) => void;
}

const BannerChangeOrderList = ({
  banners,
  createBannerPath,
  cancelBannerPath,
  isLoading,
  hoveredBannerInfo,
  handleUpdateClick,
  changeHoveredBannerInfo,
  moveBanner,
  findBanner,
}: BannerChangeOrderListProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const dataCount = banners?.length ?? 0;

  return (
    <S.PageSection>
      <S.Header>
        <div>
          <S.Title>{defaultLanguage("Change order")}</S.Title>
          <S.Desc>
            {defaultLanguage(
              "You can change the order by dragging the banner.",
            )}
          </S.Desc>
        </div>
        <S.ButtonWrapper>
          <InternalLinkButton variant="secondary" to={cancelBannerPath}>
            {defaultLanguage("Cancel")}
          </InternalLinkButton>
          <Button
            isLoading={isLoading}
            disabled={dataCount < 2}
            variant="primary"
            label="Update"
            handleButtonClick={handleUpdateClick}
          />
        </S.ButtonWrapper>
      </S.Header>
      {dataCount ? (
        <S.Banners>
          {banners?.map((banner) => (
            <MovableBannerCard
              key={banner.id}
              banner={banner}
              hoveredBannerInfo={hoveredBannerInfo}
              changeHoveredBannerInfo={changeHoveredBannerInfo}
              moveBanner={moveBanner}
              findBanner={findBanner}
            />
          ))}
        </S.Banners>
      ) : (
        <NoBannerData to={createBannerPath} />
      )}
    </S.PageSection>
  );
};

export default BannerChangeOrderList;
