import React from "react";

import { ReactComponent as CheckIcon } from "@repo/assets/icon/ic_check.svg";
import { ReactComponent as PhotoIcon } from "@repo/assets/icon/ic_photo.svg";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./UploadImageButton.styled";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import ErrorMessage from "../../message/ErrorMessage";

interface UploadImageButtonProps {
  className?: string;
  hasError: boolean;
  isLoading: boolean;
  isMaxImages: boolean;
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
          <S.Label className={className} hasError={hasError} htmlFor="photo">
            {isLoading ? (
              <LoadingSpinner css={S.loadingSpinner} />
            ) : (
              <>
                <PhotoIcon css={S.photoIcon} />
                <span>{defaultLanguage(LANGUAGE_LABEL.UPLOAD_PHOTO)}</span>
                <input
                  id="photo"
                  accept="image/jpg, image/jpeg, image/png"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
              </>
            )}
          </S.Label>
          {hasError && <ErrorMessage message={COMMON_ERROR_MESSAGE.FIELD} />}
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
