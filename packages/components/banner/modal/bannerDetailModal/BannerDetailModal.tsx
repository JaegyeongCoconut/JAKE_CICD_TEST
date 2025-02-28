import React from "react";

import { BANNER_LINK_RADIOS, BANNER_STATUS_LIST } from "@repo/assets/static";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { BannerItem, Languages } from "@repo/types";
import { formatICTDateTime } from "@repo/utils/date";
import { findLookupTableLabel } from "@repo/utils/method";

import * as S from "./BannerDetailModal.styled";
import GhostButton from "../../../button/ghost/GhostButton";
import RadioButton from "../../../button/radio/RadioButton";
import LabelContentTable from "../../../label/table/content/LabelContentTable";
import DetailModal from "../../../modal/detail/DetailModal";

interface BannerDetailModalProps {
  bannerItem: Omit<BannerItem, "isLoading" | "isActive"> & {
    created: string;
    link: string;
    noticeTitle: string | null;
    radioState: 0 | 1;
  };
  handleDeleteBannerClick: () => void;
  handleUpdateClickBanner: () => void;
  handleRadioButtonClick: (key: 0 | 1) => () => void;
  handleStatusUpdate: () => void;
}

const BannerDetailModal = React.forwardRef<
  HTMLDialogElement,
  BannerDetailModalProps
>(
  (
    {
      bannerItem,
      handleDeleteBannerClick,
      handleUpdateClickBanner,
      handleRadioButtonClick,
      handleStatusUpdate,
    },
    ref,
  ) => {
    const { defaultLanguage } = useDefaultLanguage();

    const bannerColor = bannerItem.color.replace("#", "");

    return (
      <DetailModal
        ref={ref}
        title="Banner details"
        desc={`(${bannerItem.id ? bannerItem.id : "-"})` as Languages}
        isNegDisabled={bannerItem.status === 1}
        isPosDisabled={bannerItem.status === 1}
        isPosLoading={false}
        negButtonName="Delete banner"
        posButtonName="Edit banner"
        negFn={handleDeleteBannerClick}
        posFn={handleUpdateClickBanner}
      >
        <LabelContentTable variant="bg">
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Order">
              <span>{bannerItem.idx === null ? "-" : bannerItem.idx + 1}</span>
            </LabelContentTable.Content>
          </LabelContentTable.Row>
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Status">
              <S.StatusWrapper>
                <RadioButton
                  css={S.customRadioButton}
                  radioState={bannerItem.radioState ? bannerItem.radioState : 0}
                  radioList={BANNER_STATUS_LIST}
                  handleRadioButtonClick={handleRadioButtonClick}
                />
                <GhostButton
                  variant="ghost_blue"
                  label="Save changes"
                  handleButtonClick={handleStatusUpdate}
                />
              </S.StatusWrapper>
            </LabelContentTable.Content>
          </LabelContentTable.Row>
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Linked">
              {
                <S.LinkWrapper>
                  <S.LinkedType>
                    <span>
                      {bannerItem.linkType
                        ? defaultLanguage(
                            findLookupTableLabel(
                              BANNER_LINK_RADIOS,
                              bannerItem.linkType,
                            ) as Languages,
                          )
                        : "-"}
                    </span>
                  </S.LinkedType>
                  <S.LinkedContent>
                    <span>
                      {bannerItem.linkType
                        ? bannerItem.linkType === "url"
                          ? bannerItem.link
                          : bannerItem.noticeTitle
                        : "-"}
                    </span>
                  </S.LinkedContent>
                </S.LinkWrapper>
              }
            </LabelContentTable.Content>
          </LabelContentTable.Row>
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Banner image">
              <S.BannerImg
                src={bannerItem.imageUrl}
                bgColor={`#${bannerColor ? bannerColor : "FFFFFF"}`}
                draggable={false}
              />
            </LabelContentTable.Content>
          </LabelContentTable.Row>
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Background color">
              <>
                <S.BackgroundColorBox
                  bgColor={`#${bannerColor ? bannerColor : "FFFFFF"}`}
                />
                <span>#{bannerColor ? bannerColor : "-"}</span>
              </>
            </LabelContentTable.Content>
          </LabelContentTable.Row>
          <LabelContentTable.Row>
            <LabelContentTable.Content label="Created date">
              <span>
                {bannerItem.created
                  ? formatICTDateTime(bannerItem.created)
                  : "-"}
              </span>
            </LabelContentTable.Content>
          </LabelContentTable.Row>
        </LabelContentTable>
      </DetailModal>
    );
  },
);

BannerDetailModal.displayName = "BannerDetailModal";

export default BannerDetailModal;
