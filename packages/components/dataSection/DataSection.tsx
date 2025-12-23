import React, { Children, useCallback } from "react";

import { ReactComponent as DownloadIcon } from "@repo/assets/icon/ic_download.svg";
import { ReactComponent as RefreshIcon } from "@repo/assets/icon/ic_refresh.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";
import { formatICTDateTime, formatLocalDateTime } from "@repo/utils/date";
import { comma } from "@repo/utils/formatter/currency";

import * as S from "./DataSection.styled";
import Button from "../button/Button";

interface DataSectionProps {
  className?: string;
  isApiCalled: boolean;
  isLocalTime?: boolean; // NOTE: moveIoT 에서만 사용하고 있어 옵셔널 유지
  activeButtons: React.ReactNode;
  dataUpdatedAt: number;
  title: Languages;
  totalData: number;
  onRefetch: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}

const DataSection = ({
  className,
  isApiCalled,
  isLocalTime = false,
  activeButtons,
  dataUpdatedAt,
  title,
  totalData,
  onRefetch,
  onRemove,
  children,
}: DataSectionProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const handleRefetch = useCallback(() => {
    onRemove && onRemove();
    onRefetch && onRefetch();
  }, [onRemove, onRefetch]);

  return (
    <section className={className}>
      <S.Header
        hasOnlyButton={
          isApiCalled && !title && Children.count(activeButtons) > 0
        }
      >
        <S.LeftContent>
          <h2>
            {defaultLanguage({ text: title })}&#32;(
            {!isApiCalled ? 0 : totalData ? comma(totalData) : 0})
          </h2>
          {isApiCalled && (
            <S.Refetch>
              <span>
                {defaultLanguage({ text: LANGUAGE_LABEL.LATEST_UPDATED })}:
              </span>
              <time>
                {dataUpdatedAt
                  ? isLocalTime
                    ? formatLocalDateTime({
                        date: dataUpdatedAt,
                        template: "DD/MM/YYYY, HH:mm",
                      })
                    : formatICTDateTime({ date: dataUpdatedAt })
                  : "-"}
              </time>
              {dataUpdatedAt && (
                <S.RefetchButton type="button" onClick={handleRefetch}>
                  <RefreshIcon css={S.resetIcon} />
                </S.RefetchButton>
              )}
            </S.Refetch>
          )}
        </S.LeftContent>
        {activeButtons}
      </S.Header>
      {children}
    </section>
  );
};

interface ExcelDownloadButtonProps {
  className?: string;
  disabled: boolean;
  isLoading: boolean;
  handleDownload: () => void;
}

DataSection.ExcelDownloadButton = function ExcelDownloadButton({
  disabled,
  isLoading,
  handleDownload,
}: ExcelDownloadButtonProps) {
  return (
    <Button
      css={S.excelDownloadButton}
      variant="secondary"
      disabled={disabled}
      isLoading={isLoading}
      Icon={DownloadIcon}
      label={LANGUAGE_LABEL.EXPORT}
      handleButtonClick={handleDownload}
    />
  );
};

export default DataSection;
