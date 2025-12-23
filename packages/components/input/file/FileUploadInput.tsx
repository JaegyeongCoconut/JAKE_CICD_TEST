import type { MutableRefObject } from "react";
import React from "react";

import { ReactComponent as BinIcon } from "@repo/assets/icon/ic_bin.svg";
import { ReactComponent as UploadIcon } from "@repo/assets/icon/ic_upload.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./FileUploadInput.styled";
import ErrorMessage from "../../message/ErrorMessage";

interface FileUploadInputProps {
  className?: string;
  acceptFileExtension: string;
  fileInputInfo: Languages;
  fileInputRef: MutableRefObject<null>;
  placeholder: string;
}

interface DisabledFileUploadInputProps extends FileUploadInputProps {
  disabled: true;
  isFileAttached?: never;
  errorMessage?: never;
  handleFileDelete?: never;
  handleFileUpload?: never;
}

interface EnabledFileUploadInputProps extends FileUploadInputProps {
  disabled: boolean;
  isFileAttached: boolean;
  errorMessage: string | undefined;
  handleFileDelete: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput = ({
  className,
  disabled,
  isFileAttached,
  acceptFileExtension,
  errorMessage,
  fileInputInfo,
  fileInputRef,
  placeholder,
  handleFileDelete,
  handleFileUpload,
}: DisabledFileUploadInputProps | EnabledFileUploadInputProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.FileInputWrapper className={className}>
      <S.FileInput disabled={disabled} hasError={!!errorMessage}>
        <S.FileInputPlaceholder isFileAttached={isFileAttached ?? false}>
          {placeholder}
        </S.FileInputPlaceholder>
        <S.FileButtonWrapper>
          {isFileAttached ? (
            <S.DeleteButton onClick={handleFileDelete}>
              <BinIcon css={S.trashIcon} />
            </S.DeleteButton>
          ) : (
            <S.FileUploadButton>
              <UploadIcon css={S.uploadIcon} />
              <input
                ref={fileInputRef}
                disabled={disabled}
                accept={acceptFileExtension}
                type="file"
                onChange={handleFileUpload}
              />
            </S.FileUploadButton>
          )}
        </S.FileButtonWrapper>
      </S.FileInput>
      <S.FileInputInfo>
        {defaultLanguage({ text: fileInputInfo })}
      </S.FileInputInfo>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </S.FileInputWrapper>
  );
};

export default FileUploadInput;
