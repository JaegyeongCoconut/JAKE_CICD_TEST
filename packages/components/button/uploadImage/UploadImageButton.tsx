import React from "react";

import { CheckIcon, PhotoIcon } from "@repo/assets/icon";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./UploadImageButton.styled";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../message/ErrorMessage";

interface UploadImageButtonProps {
  className?: string;
  isLoading: boolean;
  isMaxImages: boolean;
  hasError: boolean;
  uploadCompletedLabel: Languages;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageButton = ({
  className,
  isLoading,
  isMaxImages,
  hasError,
  uploadCompletedLabel,
  handleImageChange,
}: UploadImageButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <>
      {!isMaxImages ? (
        <>
          <S.Label className={className} htmlFor="photo" hasError={hasError}>
            {isLoading ? (
              <LoadingSpinner css={S.loadingSpinner} />
            ) : (
              <>
                <PhotoIcon css={S.photoIcon} />
                <span>{defaultLanguage("Upload photo")}</span>
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  id="photo"
                  multiple
                  onChange={handleImageChange}
                />
              </>
            )}
          </S.Label>
          {hasError && (
            <ErrorMessage message={COMMON_ERROR_MESSAGE.FILE_UPLOAD} />
          )}
        </>
      ) : (
        <S.CompletedUploadLabel hasError={hasError}>
          <CheckIcon css={S.checkIcon} />
          <span>{defaultLanguage(uploadCompletedLabel)}</span>
        </S.CompletedUploadLabel>
      )}
    </>
  );
};

export default UploadImageButton;
