import type { S3PresignedServerModel } from "@repo/types";

export const getFileSize = (type: "MB" | "KB", size: number): number => {
  switch (type) {
    case "KB":
      return +(size / 1024).toFixed(2);
    case "MB":
      return +(size / 1048576).toFixed(2);
  }
};

export const getS3FileFormData = (
  s3Info: S3PresignedServerModel,
  file: File,
): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(s3Info.data.fields)) {
    formData.append(key, value);
  }
  formData.append("Content-type", file.type);
  formData.append("file", file);

  return formData;
};

export const checkFileExtension = (
  acceptableFileExtensions: string[],
  currentFileExtension: string,
): boolean => acceptableFileExtensions.includes(currentFileExtension);

interface CheckImageDimensionsProps {
  file: File;
  limitWidth: number;
  limitHeight: number;
}

export const checkImageDimensions = ({
  file,
  limitWidth,
  limitHeight,
}: CheckImageDimensionsProps): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      resolve(width === limitWidth && height === limitHeight);
    };
  });
