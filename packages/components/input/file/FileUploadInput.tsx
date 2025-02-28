import React, { MutableRefObject } from "react";

import { TrashIcon, UploadIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./FileUploadInput.styled";
import ErrorMessage from "../../message/ErrorMessage";

interface FileInputProps {
  id?: string;
  className?: string;
  acceptFileExtension: string;
  error?: string;
  fileInputRef: MutableRefObject<null>;
  fileInputInfo: Languages;
  hasError?: boolean;
  disabled: boolean;
  isFileAttached?: boolean;
  placeholder: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDelete?: () => void;
}

const FileUploadInput = ({
  className,
  id,
  acceptFileExtension,
  error,
  fileInputRef,
  fileInputInfo,
  hasError,
  disabled,
  isFileAttached,
  placeholder,
  handleFileUpload,
  handleFileDelete,
}: FileInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.FileInputWrapper className={className}>
      <S.FileInput hasError={hasError ?? false} disabled={disabled}>
        <S.FileInputPlaceholder isFileAttached={isFileAttached ?? false}>
          {placeholder}
        </S.FileInputPlaceholder>
        <S.FileButtonWrapper>
          {isFileAttached ? (
            <S.DeleteButton onClick={handleFileDelete}>
              <TrashIcon css={S.trashIcon} />
            </S.DeleteButton>
          ) : (
            <>
              <S.FileUploadButton htmlFor={id ?? "file-upload"}>
                <UploadIcon css={S.uploadIcon} />
                <input
                  id={id ?? "file-upload"}
                  ref={fileInputRef}
                  type="file"
                  accept={acceptFileExtension}
                  disabled={disabled}
                  onChange={handleFileUpload}
                />
              </S.FileUploadButton>
            </>
          )}
        </S.FileButtonWrapper>
      </S.FileInput>
      <S.FileInputInfo>{defaultLanguage(fileInputInfo)}</S.FileInputInfo>
      {error && <ErrorMessage message={error} />}
    </S.FileInputWrapper>
  );
};

export default FileUploadInput;
