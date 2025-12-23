import imageCompression from "browser-image-compression";

import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import type { ToastType } from "@repo/types";

import { getFileSize } from "../file";

export const extractS3ImageKey = (fullUrl: string) => {
  if (!(fullUrl.includes("http://") || fullUrl.includes("https://")))
    return fullUrl;

  const parts = fullUrl.split("/");
  const s3ImageKey = parts.slice(-2).join("/");

  return s3ImageKey;
};

interface CompressionImagesProps {
  compressedMaxFileSize: number;
  file: File;
  maxWidthHeight: number;
}

export const compressionImage = async ({
  file,
  compressedMaxFileSize,
  maxWidthHeight,
}: CompressionImagesProps): Promise<File | undefined> => {
  const options = {
    maxSizeMB: compressedMaxFileSize,
    maxWidthOrHeight: maxWidthHeight,
    useWebWorker: true,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    return compressedFile;
  } catch (error) {
    console.log("Compression Error", error);
    return;
  }
};

interface AppendValidFilesProps {
  hasLimit: boolean;
  currentFiles: (string | File)[];
  maxFileCount: number;
  maxFileCountLabel: Omit<ToastType, "id">;
  sortedImageFiles: File[];
  handleToastAdd: (toast: Omit<ToastType, "id">) => void;
}

export const appendValidFiles = ({
  sortedImageFiles,
  currentFiles,
  hasLimit,
  maxFileCount,
  maxFileCountLabel,
  handleToastAdd,
}: AppendValidFilesProps): File[] => {
  const validFiles: File[] = [];

  for (const file of sortedImageFiles) {
    const fileSize = getFileSize({ type: "MB", size: file.size });

    if (hasLimit && fileSize > 0.5) {
      handleToastAdd(COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB);
      continue;
    }

    if (currentFiles.length + validFiles.length >= maxFileCount) {
      handleToastAdd(maxFileCountLabel);

      break;
    }

    validFiles.push(file);
  }

  return validFiles;
};
