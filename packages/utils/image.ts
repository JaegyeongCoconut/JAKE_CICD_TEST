import imageCompression from "browser-image-compression";

import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import type { Toast } from "@repo/types";

import { getFileSize } from "./file";

export const extractS3ImageKey = (fullUrl: string) => {
  if (!fullUrl.includes("http") || !fullUrl.includes("https")) return fullUrl;

  const parts = fullUrl.split("/");
  const s3ImageKey = parts.slice(-2).join("/");

  return s3ImageKey;
};

interface CompressionImagesProps {
  file: File;
  compressedMaxFileSize: number;
  maxWidthHeight: number;
}

export const compressionImage = async ({
  file,
  compressedMaxFileSize,
  maxWidthHeight,
}: CompressionImagesProps): Promise<File | void> => {
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
  sortedImageFiles: File[];
  currentFiles: (string | File)[];
  hasLimit: boolean;
  maxFileCount: number;
  maxFileCountLabel: Omit<Toast, "id">;
  addToast: (toast: Omit<Toast, "id">) => void;
}

export const appendValidFiles = ({
  sortedImageFiles,
  currentFiles,
  hasLimit,
  maxFileCount,
  maxFileCountLabel,
  addToast,
}: AppendValidFilesProps): File[] => {
  const validFiles: File[] = [];

  for (const file of sortedImageFiles) {
    const fileSize = getFileSize("MB", file.size);

    if (hasLimit && fileSize > 0.5) {
      addToast(COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB);
      continue;
    }

    if (currentFiles.length + validFiles.length >= maxFileCount) {
      addToast(maxFileCountLabel);

      break;
    }

    validFiles.push(file);
  }

  return validFiles;
};
