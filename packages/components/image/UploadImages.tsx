import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";
import { extractS3ImageKey } from "@repo/utils/image";

import * as S from "./UploadImages.styled";
import ImagesRowPreview from "./containers/rowPreview/ImagesRowPreview";
import UploadImageButton from "../button/uploadImage/UploadImageButton";

interface UploadImagesProps {
  className?: string;
  hasError: boolean;
  hasImageInfo: boolean;
  isLoading: boolean;
  filePrefix: string;
  images: (string | File)[] | undefined | null;
  maxFileCount: number;
  uploadCompletedLabel: Languages;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => () => void;
}

const UploadImages = ({
  className,
  images,
  filePrefix,
  maxFileCount,
  uploadCompletedLabel,
  isLoading,
  hasError,
  hasImageInfo,
  handleImageChange,
  handleImageRemove,
}: UploadImagesProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.UploadImages css={className}>
      <UploadImageButton
        hasError={hasError}
        isLoading={isLoading}
        isMaxImages={(images?.length || 0) >= maxFileCount}
        uploadCompletedLabel={uploadCompletedLabel}
        handleImageChange={handleImageChange}
      />
      {hasImageInfo && (
        <S.FormatInfo>
          <li>
            ㆍ
            {defaultLanguage(
              LANGUAGE_LABEL.SUPPORT_FILE_PNG_JPEG_JPG_LIMIT_0_5MB_PER_FILE,
            )}
          </li>
          <li>
            ㆍ
            {defaultLanguage(
              LANGUAGE_LABEL.PLEASE_UPLOAD_A_PHOTO_WITH_A_16_9_RATIO_AND_LANDSCAPE_ORIENTATION,
            )}
          </li>
        </S.FormatInfo>
      )}
      <S.PreviewContent>
        {images?.map((item, i) => (
          <ImagesRowPreview
            key={i + (typeof item === "string" ? item : item.name)}
            name={
              typeof item === "string"
                ? item.includes(filePrefix)
                  ? extractS3ImageKey(item).replace(`${filePrefix}/`, "")
                  : extractS3ImageKey(item)
                : item.name
            }
            index={i}
            src={typeof item === "string" ? item : URL.createObjectURL(item)}
            handleImageRemove={handleImageRemove(i)}
          />
        ))}
      </S.PreviewContent>
    </S.UploadImages>
  );
};

export default UploadImages;
