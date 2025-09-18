import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, ReadonlyOverlappingArray } from "@repo/types";

import LabelContentTable from "./LabelContentTable";
import * as S from "./LabelContentTable.styled";

type LabelContentType = "bg" | "underline" | "empty";
type InfoPiece = { key: string; isRequired?: boolean; heading: Languages };

interface LabelContentSkeletonProps {
  className?: string;
  variant: LabelContentType;
  marginBottom?: number;
  info: ReadonlyOverlappingArray<InfoPiece>;
  labelWidth?: number; // TODO: 임시 Optional 처리 추후 필수값으로 변경 필요
  subject?: Languages | React.ReactNode;
}

const LabelContentTableSkeleton = ({
  className,
  marginBottom,
  info: infos,
  subject,
  variant,
  labelWidth,
}: LabelContentSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <LabelContentTable
      className={className}
      variant={variant}
      marginBottom={marginBottom}
    >
      {subject &&
        (typeof subject === "string" ? (
          <S.SubjectWrapper>
            {defaultLanguage(subject as Languages)}
          </S.SubjectWrapper>
        ) : (
          <S.SubjectComponentWrapper>{subject}</S.SubjectComponentWrapper>
        ))}
      {infos.map(
        (info, i) =>
          info.length !== 0 && (
            <LabelContentTable.Row key={i} partition={info.length}>
              {info.map(({ key, heading, isRequired }) => (
                <LabelContentTable.Content
                  key={key}
                  isRequired={isRequired}
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
    </LabelContentTable>
  );
};

export default LabelContentTableSkeleton;
