import React from "react";

import type { Languages } from "@repo/types";
import { extractS3ImageKey } from "@repo/utils/image";

import * as S from "./UploadImages.styled";
import ImagesFormatInfo from "./containers/formatInfo/ImagesFormatInfo";
import ImagesRowPreview from "./containers/rowPreview/ImagesRowPreview";
import UploadImageButton from "../button/uploadImage/UploadImageButton";

interface UploadImagesProps {
  className?: string;
  images: (string | File)[];
  filePrefix: string;
  maxFileCount: number;
  isLoading: boolean;
  hasError: boolean;
  hasImageInfo: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => () => void;
}

const UploadImages = ({
  className,
  images,
  filePrefix,
  maxFileCount,
  isLoading,
  hasError,
  hasImageInfo,
  handleImageChange,
  handleImageRemove,
}: UploadImagesProps) => {
  return (
    <S.UploadImages css={className}>
      <UploadImageButton
        isLoading={isLoading}
        isMaxImages={images.length >= maxFileCount}
        uploadCompletedLabel={
          `You can upload up to ${maxFileCount} photos.` as Languages
        }
        hasError={hasError}
        handleImageChange={handleImageChange}
      />
      {hasImageInfo && (
        <ImagesFormatInfo
          fileFormatLabel="Support file : png, jpeg, jpg (Limit 0.5MB per file)"
          ratioLabel="Please upload a photo with a 16:9 ratio and landscape orientation."
        />
      )}
      <S.PreviewContent>
        {images?.map((item, i) => (
          <ImagesRowPreview
            key={i + (typeof item === "string" ? item : item.name)}
            index={i}
            src={typeof item === "string" ? item : URL.createObjectURL(item)}
            name={
              typeof item === "string"
                ? item.includes(filePrefix)
                  ? extractS3ImageKey(item).replace(`${filePrefix}/`, "")
                  : extractS3ImageKey(item)
                : item.name
            }
            handleImageRemove={handleImageRemove(i)}
          />
        ))}
      </S.PreviewContent>
    </S.UploadImages>
  );
};

export default UploadImages;
