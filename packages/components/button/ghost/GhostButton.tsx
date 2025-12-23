import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./GhostButton.styled";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";

export type ButtonVariant =
  | "alert"
  | "alert_blue"
  | "alert_red"
  | "ghost"
  | "ghost_blue"
  | "ghost_red";

interface GhostButtonProps {
  className?: string;
  variant: ButtonVariant;
  Icon?: React.ReactNode; // NOTE: 사용하는곳이 많지 않아 Optional 설정
  label: Languages;
}

interface DisabledGhostButtonProps extends GhostButtonProps {
  disabled: true;
  isLoading?: never;
  handleButtonClick?: never;
}

interface EnabledGhostButtonProps extends GhostButtonProps {
  disabled: false;
  isLoading: boolean;
  handleButtonClick: (e: React.MouseEvent) => void;
}

const GhostButton = ({
  className,
  variant,
  disabled,
  isLoading,
  Icon,
  label,
  handleButtonClick,
}: DisabledGhostButtonProps | EnabledGhostButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.GhostButton
      className={className}
      variant={variant}
      disabled={disabled}
      isLoading={!!isLoading}
      tabIndex={isLoading ? -1 : 0}
      type="button"
      onClick={isLoading ? () => {} : handleButtonClick}
    >
      {isLoading && <LoadingSpinner css={S.loadingSpinner} />}
      <S.Content>
        {Icon && Icon}
        {defaultLanguage({ text: label })}
      </S.Content>
    </S.GhostButton>
  );
};

export default GhostButton;
