import React, { useRef } from "react";

import { PencilIcon, CircleUploadIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useDragDropFile from "@repo/hooks/useDragDropFile";

import * as S from "./UploadBannerCard.styled";

interface UploadBannerCardProps {
  id: string;
  accept: string;
  imgFile: string | ArrayBuffer | null;
  uploadImageFile: (file: File) => void;
}

const UploadBannerCard = ({
  id,
  accept,
  imgFile,
  uploadImageFile,
}: UploadBannerCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target?.files?.[0];

    if (!file) return;

    uploadImageFile(file);
  };

  const { dragRef, isDragging, handleDragOver, handleDrop } = useDragDropFile({
    uploadImageFile,
  });

  return (
    <S.BannerUpload ref={dragRef}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        id={`file-${id}`}
        onChange={handleImageUpload}
      />
      {imgFile ? (
        <S.ImageWrapper>
          <S.BannerPreviewImg
            src={imgFile as string}
            isDragging={false}
            draggable={false}
          />
          <S.FileUpdateLabel
            aria-label="edit file"
            htmlFor={`file-${id}`}
            tabIndex={0}
          >
            <PencilIcon css={S.pencilIcon} />
          </S.FileUpdateLabel>
        </S.ImageWrapper>
      ) : (
        <S.FileUploadWrapper
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CircleUploadIcon css={S.uploadIcon} />
          <p>{defaultLanguage("Drag and drop files to upload")}</p>
          <S.FileUploadLabel htmlFor={`file-${id}`} tabIndex={0}>
            {defaultLanguage("Upload from device")}
          </S.FileUploadLabel>
        </S.FileUploadWrapper>
      )}
    </S.BannerUpload>
  );
};

export default UploadBannerCard;
