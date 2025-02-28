import React from "react";

import type { UseMutateFunction } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ApiErrorType, FileRequestType, Languages } from "@repo/types";

import GhostButton from "../ghost/GhostButton";

interface DownloadButtonProps {
  className?: string;
  fileName: string;
  fileKey: string;
  label: Languages;
  downloadFileMutate: UseMutateFunction<
    // NOTE: res 자체를 Blob으로 념겨주고 있어서 해당과 같이 타입 설정
    AxiosResponse<any, any> | Blob,
    ApiErrorType,
    FileRequestType,
    unknown
  >;
}

const DownloadButton = ({
  className,
  fileName,
  fileKey,
  label,
  downloadFileMutate,
}: DownloadButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const handleDownload = (): void => {
    downloadFileMutate({ fileKey, fileName });
  };

  return (
    <GhostButton
      className={className}
      type="button"
      variant="ghost_blue"
      label={defaultLanguage(label) as Languages}
      handleButtonClick={handleDownload}
    />
  );
};

export default DownloadButton;
