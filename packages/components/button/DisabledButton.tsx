import type { FC, SVGProps } from "react";
import React from "react";

import type { ButtonVariant, Languages } from "@repo/types";

import Button from "./Button";

interface BaseDisabledButtonProps {
  className?: string;
  variant: ButtonVariant;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  label?: Languages;
  type?: "button" | "submit" | "reset";
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
      variant={variant}
      disabled
      Icon={Icon}
      type={type}
      handleButtonClick={() => {}}
    />
  ) : (
    <Button
      className={className}
      variant={variant}
      disabled
      isLoading={false}
      Icon={Icon}
      label={label}
      type={type}
      handleButtonClick={() => {}}
    />
  );
};

export default DisabledButton;
