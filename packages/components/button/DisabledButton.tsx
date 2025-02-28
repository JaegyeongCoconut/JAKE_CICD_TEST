import React, { type FC, type SVGProps } from "react";

import type { Languages } from "@repo/types";

import Button, { ButtonVariant } from "./Button";

interface BaseDisabledButtonProps {
  className?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  variant: ButtonVariant;
  type?: "button" | "submit" | "reset";
  label?: Languages;
}

interface IconOnlyProps extends BaseDisabledButtonProps {
  variant: "iconOnly";
  Icon: FC<SVGProps<SVGSVGElement>>;
}

interface DefaultButtonProps extends BaseDisabledButtonProps {
  variant: Exclude<ButtonVariant, "iconOnly">;
  label: Languages;
}

const DisabledButton = ({
  className,
  Icon,
  label,
  type = "button",
  variant,
}: DefaultButtonProps | IconOnlyProps) => {
  return variant === "iconOnly" ? (
    <Button
      className={className}
      type={type}
      variant={variant}
      Icon={Icon}
      disabled
      handleButtonClick={() => {}}
    />
  ) : (
    <Button
      className={className}
      type={type}
      variant={variant}
      disabled
      isLoading={false}
      Icon={Icon}
      label={label}
      handleButtonClick={() => {}}
    />
  );
};

export default DisabledButton;
