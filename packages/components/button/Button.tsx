import type { FC, SVGProps } from "react";
import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ButtonVariant, Languages } from "@repo/types";

import * as S from "./Button.styled";
import HeadlessButton from "./HeadlessButton";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface BaseButtonProps {
  className?: string;
  disabled: boolean;
  type?: "button" | "submit";
  handleButtonClick: (e: React.MouseEvent) => void;
}

interface IconOnlyProps extends BaseButtonProps {
  variant: "iconOnly";
  isLoading?: never;
  Icon: FC<SVGProps<SVGSVGElement>>;
  label?: never;
}

interface DefaultButtonProps extends BaseButtonProps {
  variant: Exclude<ButtonVariant, "iconOnly">;
  isLoading: boolean;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  label: Languages;
}

const Button = ({
  className,
  disabled,
  isLoading,
  Icon,
  label,
  type = "button",
  variant,
  handleButtonClick,
}: IconOnlyProps | DefaultButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <HeadlessButton
      css={S.button({ isLoading: !!isLoading, variant })}
      className={className}
      disabled={disabled}
      isLoading={!!isLoading}
      type={type}
      handleButtonClick={handleButtonClick}
    >
      {isLoading ? (
        <S.LoadingWrapper data-testid="spinner">
          <LoadingSpinner css={S.loadingSpinner} />
          <S.LoadingContents>
            {Icon && <Icon />}
            {label && defaultLanguage({ text: label })}
          </S.LoadingContents>
        </S.LoadingWrapper>
      ) : (
        <>
          {Icon && <Icon />}
          {label && defaultLanguage({ text: label })}
        </>
      )}
    </HeadlessButton>
  );
};

export default Button;
