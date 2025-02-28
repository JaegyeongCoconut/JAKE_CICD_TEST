import React, { useCallback } from "react";

import { DownloadIcon, ResetIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useFilterStore } from "@repo/stores/filter";
import type { Languages } from "@repo/types";
import { formatICTDateTime, formatLocalDateTime } from "@repo/utils/date";
import { comma } from "@repo/utils/formatter/currency";

import * as S from "./DataSection.styled";
import Button from "../button/Button";

interface DataSectionProps {
  className?: string;
  children: React.ReactNode;
  totalData: number;
  activeButtons?: React.ReactNode;
  dataUpdatedAt?: number;
  title?: Languages;
  isLocalTime?: boolean;
  refetch: () => void;
  remove: () => void;
}

interface ExcelDownloadButtonProps {
  className?: string;
  isLoading: boolean;
  disabled?: boolean;
  handleDownload: () => void;
}

export interface ActiveButtonProps {
  className?: string;
  label: Languages;
  variant?: "primary" | "secondary";
  disabled?: boolean;
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
  refetch,
  remove,
}: DataSectionProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const isInitFilter = useFilterStore((state) => state.isInitFilter);

  const handleRefetch = useCallback(() => {
    remove && remove();
    refetch && refetch();
  }, [remove, refetch]);

  return (
    <section className={className}>
      <S.Header>
        <S.LeftContent>
          <h2>
            {defaultLanguage(title)}&#32;(
            {isInitFilter ? 0 : totalData ? comma(totalData) : 0})
          </h2>
          {!isInitFilter && (
            <S.Refetch>
              <span>{defaultLanguage("Latest updated")}:</span>
              <time>
                {dataUpdatedAt
                  ? isLocalTime
                    ? formatLocalDateTime(dataUpdatedAt, "DD/MM/YYYY, HH:mm")
                    : formatICTDateTime(dataUpdatedAt)
                  : "-"}
              </time>
              {dataUpdatedAt && (
                <S.RefetchButton type="button" onClick={handleRefetch}>
                  <ResetIcon css={S.resetIcon} />
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
      Icon={DownloadIcon}
      isLoading={isLoading}
      disabled={disabled || false}
      variant="secondary"
      label="Export"
      handleButtonClick={handleDownload}
    />
  );
};

export default DataSection;
