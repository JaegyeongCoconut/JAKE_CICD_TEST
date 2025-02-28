import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, ReadonlyOverlappingArray } from "@repo/types";

import LabelContentTable from "./LabelContentTable";
import * as S from "./LabelContentTable.styled";

type LabelContentType = "bg" | "underline" | "empty";
type InfoPiece = { key: string; heading: Languages; isRequired?: boolean };

interface LabelContentSkeletonProps {
  className?: string;
  variant: LabelContentType;
  marginBottom?: number;
  info?: ReadonlyOverlappingArray<InfoPiece>;
  subject?: Languages | React.ReactNode;
  children?: React.ReactNode;
}

const LabelContentTableSkeleton = ({
  className,
  marginBottom,
  info,
  subject,
  variant,
  children,
}: LabelContentSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <LabelContentTable
      variant={variant}
      className={className}
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
      {info &&
        info.map((item, i) => (
          <LabelContentTable.Row partition={item.length} key={i}>
            {item.map(({ key, heading, isRequired }) => (
              <LabelContentTable.Content
                key={key}
                label={heading}
                isRequired={isRequired}
              >
                <S.SkeletonWrapper>
                  {key === "profile" ? (
                    <Skeleton circle width="56px" height="56px" />
                  ) : (
                    <Skeleton />
                  )}
                </S.SkeletonWrapper>
              </LabelContentTable.Content>
            ))}
          </LabelContentTable.Row>
        ))}
      {children && children}
    </LabelContentTable>
  );
};

export default LabelContentTableSkeleton;
