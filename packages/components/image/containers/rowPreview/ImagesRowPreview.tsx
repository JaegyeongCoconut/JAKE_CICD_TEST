import React, { useState } from "react";

import Skeleton from "react-loading-skeleton";

import { ReactComponent as BinIcon } from "@repo/assets/icon/ic_bin.svg";
import type { PreviewImageFileType } from "@repo/types";

import * as S from "./ImagesRowPreview.styled";
import Button from "../../../button/Button";
import HeadlessImage from "../../HeadlessImage";

interface ImagesRowPreviewProps extends PreviewImageFileType {
  index: number;
  handleImageRemove: () => void;
}

const ImagesRowPreview = ({
  index,
  src,
  name,
  handleImageRemove,
}: ImagesRowPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = (): void => {
    setIsLoading(false);
  };

  return (
    <S.PreviewRow>
      <span>{index + 1}</span>
      <S.PreviewImgWrapper>
        {isLoading && <Skeleton height={60} width={106} />}
        <HeadlessImage
          css={S.image(isLoading)}
          alt="image"
          src={src as string}
          handleImageLoad={handleImageLoad}
        />
        <S.ProviewImageName>{name}</S.ProviewImageName>
      </S.PreviewImgWrapper>
      <Button
        css={S.trashButton}
        variant="iconOnly"
        disabled={false}
        Icon={BinIcon}
        handleButtonClick={handleImageRemove}
      />
    </S.PreviewRow>
  );
};

export default ImagesRowPreview;
