import type { IMAGE_FILE_EXTENSIONS } from "@repo/assets/static/file";
import type { ToastType } from "@repo/types";

import { checkFileExtension, getFileSize } from "../file";
import {
  validateImageFileDimensions,
  validateSVGFileDimensions,
} from "./imageDimensions";

interface BaseImageWithToastMessageProps {
  hasMinimum: boolean;
  extensions: ReadonlyArray<(typeof IMAGE_FILE_EXTENSIONS)[number]>;
  file: File;
  fileFormatErrorToastMessage: Omit<ToastType, "id">;
  fileSizeErrorToastMessage: Omit<ToastType, "id">;
  fileSizeLimit: number;
  imageSizeErrorToastMessage: Omit<ToastType, "id">;
  standardHeight: number;
  standardWidth: number;
}

interface MinimumValidateImageWithToastMessageProps
  extends BaseImageWithToastMessageProps {
  hasMinimum: true;
  imageRatioErrorToastMessage: Omit<ToastType, "id">;
}

interface NoneMinimumValidateImageWithToastMessageProps
  extends BaseImageWithToastMessageProps {
  hasMinimum: false;
  imageRatioErrorToastMessage?: never;
}

export const validateImageWithToastMessage = async ({
  file,
  extensions,
  fileSizeLimit,
  fileSizeErrorToastMessage,
  imageSizeErrorToastMessage,
  imageRatioErrorToastMessage,
  fileFormatErrorToastMessage,
  hasMinimum,
  standardWidth,
  standardHeight,
}:
  | MinimumValidateImageWithToastMessageProps
  | NoneMinimumValidateImageWithToastMessageProps): Promise<Omit<
  ToastType,
  "id"
> | null> => {
  if (getFileSize({ type: "MB", size: file.size }) > fileSizeLimit)
    return fileSizeErrorToastMessage;
  if (
    !checkFileExtension({
      acceptableFileExtensions: extensions,
      currentFileExtension: file.type,
    })
  )
    return fileFormatErrorToastMessage;

  const errorType =
    file.type === "image/svg+xml"
      ? await validateSVGFileDimensions({
          file,
          hasMinimum,
          standardWidth,
          standardHeight,
        })
      : await validateImageFileDimensions({
          file,
          hasMinimum,
          standardWidth,
          standardHeight,
        });

  if (errorType === "sizeError") return imageSizeErrorToastMessage;
  if (hasMinimum && errorType === "ratioError")
    return imageRatioErrorToastMessage ?? imageSizeErrorToastMessage;

  return null;
};
