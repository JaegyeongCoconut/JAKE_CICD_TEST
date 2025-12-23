import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./LabelContentTable.styled";

export type LabelContentType = "bg" | "underline" | "empty";

interface BaseLabelContentTableProps {
  className?: string;
  variant: LabelContentType;
  subject: Languages | ReactNode | null;
  children: ReactNode;
}

interface DefaultMarginBottomLabelContentTableProps
  extends BaseLabelContentTableProps {
  hasDefaultMarginBottom: true;
  marginBottom?: never;
}

interface CustomMarginBottomLabelContentTableProps
  extends BaseLabelContentTableProps {
  hasDefaultMarginBottom: false;
  marginBottom: number;
}

type LabelContentTableProps =
  | DefaultMarginBottomLabelContentTableProps
  | CustomMarginBottomLabelContentTableProps;

const Context = createContext<{ variant?: LabelContentType }>({});

const LabelContentTable = ({
  children,
  className,
  marginBottom,
  hasDefaultMarginBottom,
  subject,
  variant,
}: LabelContentTableProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <Context.Provider value={{ variant }}>
      <S.LabelContentTableWrapper
        className={className}
        hasDefaultMarginBottom={hasDefaultMarginBottom}
        marginBottom={marginBottom ?? 0}
      >
        {subject &&
          (typeof subject === "string" ? (
            <S.SubjectWrapper>
              {defaultLanguage({ text: subject as Languages })}
            </S.SubjectWrapper>
          ) : (
            <S.SubjectComponentWrapper>{subject}</S.SubjectComponentWrapper>
          ))}
        {children}
      </S.LabelContentTableWrapper>
    </Context.Provider>
  );
};

interface RowProps {
  className?: string;
  hasError: boolean;
  hasPartition: boolean;
  marginTop: number;
  children: ReactNode;
}

LabelContentTable.Row = function Row({
  className,
  children,
  hasError,
  hasPartition,
  marginTop,
}: RowProps) {
  const { variant } = useContext(Context);

  return (
    <S.Row
      className={className}
      variant={variant}
      hasError={hasError}
      hasPartition={hasPartition}
      marginTop={marginTop}
    >
      {children}
    </S.Row>
  );
};

interface ContentProps {
  className?: string;
  hasError: boolean;
  isRequired: boolean;
  label: Languages;
  labelWidth: number;
  children: ReactNode;
}

LabelContentTable.Content = function Content({
  className,
  label,
  labelWidth,
  isRequired,
  hasError,
  children,
}: ContentProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const { variant } = useContext(Context);

  return (
    <S.ContentWrapper className={className} labelWidth={labelWidth}>
      <S.NameWrapper>
        <S.Name variant={variant} hasError={hasError}>
          <S.Label variant={variant} hasError={hasError}>
            {defaultLanguage({ text: label })}
          </S.Label>
          {isRequired && <S.Required>*</S.Required>}
        </S.Name>
      </S.NameWrapper>
      <S.Content variant={variant}>{children}</S.Content>
    </S.ContentWrapper>
  );
};

export default LabelContentTable;
