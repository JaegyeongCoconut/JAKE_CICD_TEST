import React, { useEffect, useRef, type FC, type SVGProps } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./Button.styled";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

export type ButtonVariant =
  | "error"
  | "filled_gray_blue"
  | "ghost_blue"
  | "iconOnly"
  | "outlined"
  | "primary"
  | "secondary"
  | "third";

interface BaseButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  Icon?: FC<SVGProps<SVGSVGElement>>;
  disabled: boolean;
  handleButtonClick: (e: React.MouseEvent) => void;
}

interface IconOnlyProps extends BaseButtonProps {
  variant: "iconOnly";
  Icon: FC<SVGProps<SVGSVGElement>>;
  label?: never;
  isLoading?: never;
}

interface DefaultButtonProps extends BaseButtonProps {
  variant: Exclude<ButtonVariant, "iconOnly">;
  label: Languages;
  isLoading: boolean;
}

const Button = ({
  className,
  disabled,
  isLoading = false,
  Icon,
  label,
  type = "button",
  variant,
  handleButtonClick,
}: IconOnlyProps | DefaultButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { defaultLanguage } = useDefaultLanguage();

  useEffect(() => {
    if (isLoading && document.activeElement === buttonRef.current) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, [isLoading]);

  return (
    <S.Button
      className={className}
      ref={buttonRef}
      isLoading={isLoading}
      disabled={disabled}
      type={type}
      variant={variant}
      tabIndex={isLoading ? -1 : 0}
      onClick={handleButtonClick}
    >
      {isLoading ? (
        <S.LoadingWrapper>
          <LoadingSpinner css={S.loadingSpinner} />
          <S.LoadingContents>
            {Icon && <Icon />}
            {label && defaultLanguage(label)}
          </S.LoadingContents>
        </S.LoadingWrapper>
      ) : (
        <>
          {Icon && <Icon />}
          {label && defaultLanguage(label)}
        </>
      )}
    </S.Button>
  );
};

export default Button;
