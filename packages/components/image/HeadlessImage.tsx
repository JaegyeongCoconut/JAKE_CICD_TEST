import type { SyntheticEvent } from "react";
import React from "react";

interface HeadlessImageProps {
  className?: string;
  alt: string;
  src: string;
  handleImageError?: (e: SyntheticEvent<HTMLImageElement>) => void; // NOTE: 이미지 태그 onError 속성을 사용하는 컴포넌트가 있어 옵셔널 처리
  handleImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
}

const HeadlessImage = ({
  className,
  src,
  alt,
  handleImageLoad,
  handleImageError,
}: HeadlessImageProps) => {
  return (
    <img
      className={className}
      alt={alt}
      src={src}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

export default HeadlessImage;
