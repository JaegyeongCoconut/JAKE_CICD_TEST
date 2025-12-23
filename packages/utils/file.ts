import type { AxiosResponse } from "axios";

import type { IMAGE_FILE_EXTENSIONS } from "@repo/assets/static/file";
import type { S3PresignedServerModel } from "@repo/types";

import { makeNewImageFileName } from "./formatter/name";
import { extractS3ImageKey } from "./image/common";

interface GetFileSizeProps {
  size: number;
  type: "MB" | "kB";
}

export const getFileSize = ({ type, size }: GetFileSizeProps): number => {
  switch (type) {
    case "kB":
      return +(size / 1024).toFixed(2);
    case "MB":
      return +(size / 1048576).toFixed(2);
  }
};

interface GetS3FileFormDataProps {
  file: File;
  s3Info: S3PresignedServerModel;
}

export const getS3FileFormData = ({
  s3Info,
  file,
}: GetS3FileFormDataProps): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(s3Info.data.fields)) {
    formData.append(key, value);
  }
  formData.append("Content-type", file.type);
  formData.append("file", file);

  return formData;
};

interface CheckFileExtensionProps {
  acceptableFileExtensions: ReadonlyArray<
    (typeof IMAGE_FILE_EXTENSIONS)[number]
  >;
  currentFileExtension: string;
}

export const checkFileExtension = ({
  acceptableFileExtensions,
  currentFileExtension,
}: CheckFileExtensionProps): boolean =>
  (acceptableFileExtensions as string[]).includes(currentFileExtension);

interface UploadFileToS3AndReturnFileKeyProps {
  file: File | string;
  urlPrefix: string;
  onCreateS3PresignedUrlAPI: (
    key: string,
    file: File,
  ) => Promise<AxiosResponse<unknown, unknown>>;
}

export const uploadFileToS3AndReturnFileKey = async ({
  urlPrefix,
  file,
  onCreateS3PresignedUrlAPI,
}: UploadFileToS3AndReturnFileKeyProps): Promise<string> => {
  if (typeof file === "string") return extractS3ImageKey(file);

  const photoUid = makeNewImageFileName(file);
  const fileKey = `${urlPrefix}/${photoUid}`;
  const s3ResInfos = await onCreateS3PresignedUrlAPI(fileKey, file);

  return s3ResInfos.status === 204 ? fileKey : "";
};
