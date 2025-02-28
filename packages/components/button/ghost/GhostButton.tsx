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
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  variant: ButtonVariant;
  label: Languages;
  icon?: {
    component: React.ReactNode;
    position: "left" | "right";
  };
  handleButtonClick?: (e: React.MouseEvent) => void;
}

const GhostButton = ({
  className,
  disabled,
  isLoading = false,
  icon,
  label,
  type = "button",
  variant,
  handleButtonClick,
}: GhostButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.GhostButton
      className={className}
      isLoading={isLoading}
      disabled={disabled}
      type={type}
      variant={variant}
      onClick={handleButtonClick}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon?.position === "left" && icon.component}
          {defaultLanguage(label)}
          {icon?.position === "right" && icon.component}
        </>
      )}
    </S.GhostButton>
  );
};

export default GhostButton;
