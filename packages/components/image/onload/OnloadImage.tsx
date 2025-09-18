import React, { useState } from "react";

import Skeleton from "react-loading-skeleton";

import NoneImage from "@repo/assets/image/none.png";

import HeadlessImage from "../HeadlessImage";
import * as S from "./OnloadImage.styled";

interface OnloadImageProps {
  className?: string;
  height: number;
  width: number;
  alt: string;
  src: string | undefined | null;
  handleLoadingCheck?: () => void;
}

const OnloadImage = ({
  className,
  src,
  alt,
  width,
  height,
  handleLoadingCheck,
}: OnloadImageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = (): void => setIsLoading(false);

  const controlImgError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = e.target as HTMLImageElement;
    img.src = NoneImage;
    handleLoadingCheck && handleLoadingCheck();
  };

  return (
    <div className={className}>
      {isLoading && <Skeleton css={S.skeleton} height={height} width={width} />}
      <HeadlessImage
        css={S.image({ isLoading, width, height })}
        alt={alt}
        src={src ?? NoneImage}
        handleImageError={controlImgError}
        handleImageLoad={handleImageLoad}
      />
    </div>
  );
};

export default OnloadImage;
