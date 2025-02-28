import React, { Suspense } from "react";

import { BANNER_DETAIL_INFO } from "@repo/assets/static";
import useModal from "@repo/hooks/modal/useModal";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { BannerItem, Languages } from "@repo/types";

import * as S from "./BannerMainList.styled";
import { InternalLinkButton } from "../../../button";
import BannerCard from "../../card/BannerCard";
import CreateBannerCard from "../../card/create/CreateBannerCard";
import BannerDetailModalSkeleton from "../../modal/bannerDetailModal/BannerDetailModal.skeleton";

interface BannerMainListProps {
  banners: BannerItem[] | undefined;
  createBannerDescription: Languages;
  createBannerPath: string;
  changeBannerOrderPath: string;
  ModalComponent: React.ForwardRefExoticComponent<
    { bannerId: string } & React.RefAttributes<HTMLDialogElement>
  >;
}

const BannerMainList = ({
  banners,
  createBannerDescription,
  createBannerPath,
  changeBannerOrderPath,
  ModalComponent,
}: BannerMainListProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { modalRef, handleModalOpen } = useModal();

  const dataCount = banners?.length ?? 0;

  return (
    <>
      <S.BannersHeader>
        <S.Title>{`${defaultLanguage("Banners")} (${dataCount})`}</S.Title>
        {dataCount > 1 && (
          <InternalLinkButton variant="secondary" to={changeBannerOrderPath}>
            {defaultLanguage("Change order")}
          </InternalLinkButton>
        )}
      </S.BannersHeader>
      <S.Banners>
        <CreateBannerCard
          dataCount={dataCount}
          desc={createBannerDescription}
          to={createBannerPath}
        />
        {banners?.map((banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
            handleBannerClick={handleModalOpen(
              <Suspense
                fallback={
                  <BannerDetailModalSkeleton
                    ref={modalRef}
                    infos={BANNER_DETAIL_INFO}
                  />
                }
              >
                <ModalComponent ref={modalRef} bannerId={banner.id} />
              </Suspense>,
            )}
          />
        ))}
      </S.Banners>
    </>
  );
};

export default BannerMainList;
