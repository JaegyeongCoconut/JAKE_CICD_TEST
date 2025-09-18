import React, { useCallback } from "react";

import { ReactComponent as DownloadIcon } from "@repo/assets/icon/ic_download.svg";
import { ReactComponent as RefreshIcon } from "@repo/assets/icon/ic_refresh.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useQueryInitFilterHooks from "@repo/hooks/queryFilter/useQueryInitFilterHooks";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";
import { formatICTDateTime, formatLocalDateTime } from "@repo/utils/date";
import { comma } from "@repo/utils/formatter/currency";

import * as S from "./DataSection.styled";
import Button from "../button/Button";

interface DataSectionProps {
  className?: string;
  isLocalTime?: boolean;
  activeButtons?: React.ReactNode;
  dataUpdatedAt?: number;
  title?: Languages;
  totalData: number;
  onRefetch: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}

interface ExcelDownloadButtonProps {
  className?: string;
  disabled?: boolean;
  isLoading: boolean;
  handleDownload: () => void;
}

export interface ActiveButtonProps {
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  label: Languages;
  handleActiveButtonClick: () => void;
}

const DataSection = ({
  children,
  className,
  totalData,
  activeButtons,
  dataUpdatedAt,
  title = "List",
  isLocalTime = false,
  onRefetch,
  onRemove,
}: DataSectionProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { isInitQueryFilter } = useQueryInitFilterHooks();

  const handleRefetch = useCallback(() => {
    onRemove && onRemove();
    onRefetch && onRefetch();
  }, [onRemove, onRefetch]);

  return (
    <section className={className}>
      <S.Header>
        <S.LeftContent>
          <h2>
            {defaultLanguage(title)}&#32;(
            {isInitQueryFilter ? 0 : totalData ? comma(totalData) : 0})
          </h2>
          {!isInitQueryFilter && (
            <S.Refetch>
              <span>{defaultLanguage(LANGUAGE_LABEL.LATEST_UPDATED)}:</span>
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

DataSection.ExcelDownloadButton = function ExcelDownloadButton({
  handleDownload,
  isLoading,
  disabled,
}: ExcelDownloadButtonProps) {
  return (
    <Button
      css={S.excelDownloadButton}
      variant="secondary"
      disabled={disabled || false}
      isLoading={isLoading}
      Icon={DownloadIcon}
      label={LANGUAGE_LABEL.EXPORT}
      handleButtonClick={handleDownload}
    />
  );
};

export default DataSection;
