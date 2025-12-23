import React from "react";

import type { jsx } from "@emotion/react";
import Skeleton from "react-loading-skeleton";

import type { Languages, ReadonlyOverlappingArray } from "@repo/types";

import type { LabelContentType } from "./LabelContentTable";
import LabelContentTable from "./LabelContentTable";
import * as S from "./LabelContentTable.styled";

interface BaseLabelContentTableSkeletonProps {
  className?: string;
  variant: LabelContentType;
  info: ReadonlyOverlappingArray<{
    key: string;
    heading: Languages;
  }>;
  labelWidth: number;
  subject: Languages | React.ReactNode | null;
}

interface DefaultMarginBottomLabelContentTableSkeletonProps
  extends BaseLabelContentTableSkeletonProps {
  hasDefaultMarginBottom: true;
  marginBottom?: never;
}

interface CustomMarginBottomLabelContentTableSkeletonProps
  extends BaseLabelContentTableSkeletonProps {
  hasDefaultMarginBottom: false;
  marginBottom: number;
}

type LabelContentTableSkeletonProps =
  | DefaultMarginBottomLabelContentTableSkeletonProps
  | CustomMarginBottomLabelContentTableSkeletonProps;

const LabelContentTableSkeleton = ({
  className,
  marginBottom,
  hasDefaultMarginBottom,
  info: infos,
  subject,
  variant,
  labelWidth,
}: LabelContentTableSkeletonProps) => {
  const renderRow = (): jsx.JSX.Element => {
    return (
      <>
        {infos.map(
          (info, i) =>
            info.length !== 0 && (
              <LabelContentTable.Row
                key={i}
                hasError={false}
                hasPartition={info.length === 2}
                marginTop={0}
              >
                {info.map(({ key, heading }) => (
                  <LabelContentTable.Content
                    key={key}
                    hasError={false}
                    isRequired={false}
                    label={heading}
                    labelWidth={labelWidth}
                  >
                    <S.SkeletonWrapper>
                      {key === "profile" ? (
                        <Skeleton height="56px" width="56px" circle />
                      ) : (
                        <Skeleton />
                      )}
                    </S.SkeletonWrapper>
                  </LabelContentTable.Content>
                ))}
              </LabelContentTable.Row>
            ),
        )}
      </>
    );
  };

  return hasDefaultMarginBottom ? (
    <LabelContentTable
      className={className}
      variant={variant}
      hasDefaultMarginBottom
      subject={subject}
    >
      {renderRow()}
    </LabelContentTable>
  ) : (
    <LabelContentTable
      className={className}
      variant={variant}
      hasDefaultMarginBottom={false}
      marginBottom={marginBottom}
      subject={subject}
    >
      {renderRow()}
    </LabelContentTable>
  );
};

export default LabelContentTableSkeleton;
