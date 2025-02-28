import React from "react";

import { CircleUploadIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./UploadBannerCard.styled";

const UploadBannerCardSkeleton = () => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.BannerUpload draggable={false}>
      <S.FileUploadWrapper isDragging={false}>
        <CircleUploadIcon css={S.uploadIcon} />
        <p>{defaultLanguage("Drag and drop files to upload")}</p>
        <S.FileUploadLabel htmlFor={`file-banner-image`} tabIndex={0}>
          {defaultLanguage("Upload from device")}
        </S.FileUploadLabel>
      </S.FileUploadWrapper>
    </S.BannerUpload>
  );
};

export default UploadBannerCardSkeleton;
