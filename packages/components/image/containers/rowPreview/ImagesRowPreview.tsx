import React, { useState } from "react";

import { TrashIcon } from "@repo/assets/icon";
import type { PreviewImageFileType } from "@repo/types";

import * as S from "./ImagesRowPreview.styled";
import Button from "../../../button/Button";
import LoadingSpinner from "../../../loadingSpinner/LoadingSpinner";

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
        {isLoading && <LoadingSpinner css={S.loadingSpinner} />}
        <S.PreviewImg
          isLoading={isLoading}
          src={src as string}
          onLoad={handleImageLoad}
        />
        <S.ProviewImageName>{name}</S.ProviewImageName>
      </S.PreviewImgWrapper>
      <Button
        css={S.trashButton}
        variant="iconOnly"
        disabled={false}
        Icon={TrashIcon}
        handleButtonClick={handleImageRemove}
      />
    </S.PreviewRow>
  );
};

export default ImagesRowPreview;
