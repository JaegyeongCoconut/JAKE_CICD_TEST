import type { FC, SVGProps } from "react";
import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ButtonVariant, Languages } from "@repo/types";

import * as S from "./DisabledButton.styled";
import HeadlessButton from "../HeadlessButton";

interface DisabledIconOnlyButtonProps {
  className?: string;
  variant: "iconOnly";
  Icon: FC<SVGProps<SVGSVGElement>>;
  label?: never;
}

interface DisabledDefaultButtonProps {
  className?: string;
  variant: Exclude<ButtonVariant, "iconOnly">;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  label: Languages;
}

const DisabledButton = ({
  className,
  Icon,
  label,
  variant,
}: DisabledDefaultButtonProps | DisabledIconOnlyButtonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <HeadlessButton
      css={S.button(variant)}
      className={className}
      disabled
      isLoading={false}
      type="button"
      handleButtonClick={() => {}}
    >
      <>
        {Icon && <Icon />}
        {label && defaultLanguage({ text: label })}
      </>
    </HeadlessButton>
  );
};

export default DisabledButton;
