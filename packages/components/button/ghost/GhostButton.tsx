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
  disabled?: boolean;
  isLoading?: boolean;
  icon?: {
    position: "left" | "right";
    component: React.ReactNode;
  };
  label: Languages;
  type?: "button" | "submit" | "reset";
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
      variant={variant}
      disabled={disabled}
      isLoading={isLoading}
      type={type}
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
