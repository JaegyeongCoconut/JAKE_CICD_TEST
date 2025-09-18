import type {
  PNG_FILE_EXTENSIONS,
  PNG_JPG_JPEG_FILE_EXTENSIONS,
  SVG_FILE_EXTENSIONS,
} from "@repo/assets/static/file";
import type { ToastType } from "@repo/types";

import { checkFileExtension, getFileSize } from "./file";

interface FileDimensionsProps {
  hasMinimum: boolean;
  file: File;
  standardHeight: number;
  standardWidth: number;
}

type ValidateFileDimensionsType = "valid" | "sizeError" | "ratioError" | false;

interface CheckDimensionsProps {
  hasMinimum: boolean;
  height: number;
  width: number;
  standardHeight: number;
  standardWidth: number;
}

const checkDimensions = ({
  width,
  height,
  hasMinimum,
  standardWidth,
  standardHeight,
}: CheckDimensionsProps): ValidateFileDimensionsType => {
  if (isNaN(width) || isNaN(height)) return "sizeError";

  if (hasMinimum) {
    const minRatio = standardWidth / standardHeight;
    const actualRatio = width / height;
    const hasSizeError = width >= standardWidth && height >= standardHeight;
    //NOTE: 부동 소수점 문제 예방을 위한 조건문
    const hasRadioError = Math.abs(actualRatio - minRatio) < 0.01;

    if (!hasSizeError) return "sizeError";
    if (!hasRadioError) return "ratioError";

    return "valid";
  } else {
    return width === standardWidth && height === standardHeight
      ? "valid"
      : "sizeError";
  }
};

const validateSVGFileDimensions = async ({
  file,
  hasMinimum,
  standardWidth,
  standardHeight,
}: FileDimensionsProps): Promise<ValidateFileDimensionsType> => {
  try {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) return "sizeError";

    let width = parseFloat(svg.getAttribute("width") || "");
    let height = parseFloat(svg.getAttribute("height") || "");

    if (isNaN(width) || isNaN(height)) {
      const viewBox = svg.getAttribute("viewBox");
      if (viewBox) {
        const [, , viewBoxWidth, viewBoxHeight] = viewBox
          .split(" ")
          .map(Number);
        width = viewBoxWidth;
        height = viewBoxHeight;
      }
    }

    return checkDimensions({
      width,
      height,
      hasMinimum,
      standardWidth,
      standardHeight,
    });
  } catch (err) {
    console.error("SVG 파싱 실패", err);
    return false;
  }
};

const validateImageFileDimensions = ({
  file,
  hasMinimum,
  standardWidth,
  standardHeight,
}: FileDimensionsProps): Promise<ValidateFileDimensionsType> =>
  new Promise((resolve) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);
    img.src = objectURL;

    img.onload = () => {
      URL.revokeObjectURL(objectURL);
      resolve(
        checkDimensions({
          width: img.width,
          height: img.height,
          hasMinimum,
          standardWidth,
          standardHeight,
        }),
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      resolve(false);
    };
  });

interface BaseImageWithToastMessageProps {
  hasMinimum: boolean;
  extensions:
    | typeof PNG_JPG_JPEG_FILE_EXTENSIONS
    | typeof PNG_FILE_EXTENSIONS
    | typeof SVG_FILE_EXTENSIONS;
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
