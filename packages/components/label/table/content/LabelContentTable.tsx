import React, { createContext, useContext, useId } from "react";

// NOTE: moduleResolution: bundler는 jsx-namespace를 해석할 수 없었음
// 따라서 type을 따라가 동일한 타입인 jsx로 접근하도록 수정함
// export const jsx: typeof createElement
// export namespace jsx {
//   namespace JSX {
//     type ElementType = EmotionJSX.ElementType
import type { jsx } from "@emotion/react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./LabelContentTable.styled";

export type LabelContentType = "bg" | "underline" | "empty";

interface LabelContentTableProps {
  children: React.ReactNode;
  className?: string;
  variant: LabelContentType;
  marginBottom?: number;
  subject?: Languages | React.ReactNode;
}

const Context = createContext<{ variant?: LabelContentType }>({});

const LabelContentTable = ({
  children,
  className,
  marginBottom,
  subject,
  variant,
}: LabelContentTableProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <Context.Provider value={{ variant }}>
      <S.LabelContentTableWrapper
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
        {children}
      </S.LabelContentTableWrapper>
    </Context.Provider>
  );
};

interface RowProps {
  className?: string;
  partition?: number;
  hasError?: boolean;
  marginTop?: number;
  children: React.ReactNode;
  draggable?: boolean;
  handleDragStart?: () => void;
  handleDragEnd?: () => void;
  handleDragEnter?: () => void;
  handleMouseDown?: () => void;
  handleMouseUp?: () => void;
  handleDragOver?: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop?: (e: React.DragEvent<HTMLElement>) => void;
}

LabelContentTable.Row = function Row({
  className,
  children,
  draggable,
  hasError,
  partition = 1,
  marginTop,
  handleDragStart,
  handleDragEnd,
  handleDragEnter,
  handleMouseDown,
  handleMouseUp,
  handleDragOver,
  handleDrop,
}: RowProps) {
  const { variant } = useContext(Context);

  return (
    <S.Row
      className={className}
      variant={variant}
      marginTop={marginTop}
      hasError={hasError}
      partition={partition}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </S.Row>
  );
};

interface ContentProps {
  className?: string;
  label: Languages;
  labelWidth?: number;
  isRequired?: boolean;
  hasError?: boolean;
  tooltip?: React.ReactNode;
  children: jsx.JSX.Element;
}

LabelContentTable.Content = function Content({
  className,
  label,
  labelWidth,
  isRequired,
  hasError,
  tooltip,
  children,
}: ContentProps) {
  const { defaultLanguage } = useDefaultLanguage();

  const { variant } = useContext(Context);

  return (
    <S.ContentWrapper
      className={className}
      variant={variant}
      labelWidth={labelWidth}
    >
      <S.NameWrapper>
        <S.Name variant={variant} hasError={hasError}>
          {defaultLanguage(label)}
          {isRequired && <S.Required>*</S.Required>}
          {tooltip && <S.TooltipWrapper>{tooltip}</S.TooltipWrapper>}
        </S.Name>
      </S.NameWrapper>
      <S.Content variant={variant}>{children}</S.Content>
    </S.ContentWrapper>
  );
};

interface CheckBoxContentProps extends ContentProps {
  disabled?: boolean;
  isChecked?: boolean;
  handleCheck: () => void;
}

LabelContentTable.CheckBoxContent = function CheckBoxContent({
  className,
  label,
  labelWidth,
  disabled,
  isChecked,
  isRequired,
  hasError,
  tooltip,
  handleCheck,
  children,
}: CheckBoxContentProps) {
  const uuid = useId();
  const { defaultLanguage } = useDefaultLanguage();

  const { variant } = useContext(Context);

  return (
    <S.ContentWrapper
      className={className}
      variant={variant}
      labelWidth={labelWidth}
    >
      <S.NameWrapper>
        <S.CheckboxLabel
          variant={variant}
          hasError={hasError}
          disabled={disabled}
        >
          <input
            type="checkbox"
            id={uuid}
            checked={isChecked}
            disabled={disabled}
            readOnly
            onChange={handleCheck}
          />
          <S.Checkbox htmlFor={uuid} tabIndex={0} />
          <span>{defaultLanguage(label)}</span>
          {isRequired && <S.Required>*</S.Required>}
          {tooltip && <S.TooltipWrapper>{tooltip}</S.TooltipWrapper>}
        </S.CheckboxLabel>
      </S.NameWrapper>
      <S.Content variant={variant}>{children}</S.Content>
    </S.ContentWrapper>
  );
};

export default LabelContentTable;
