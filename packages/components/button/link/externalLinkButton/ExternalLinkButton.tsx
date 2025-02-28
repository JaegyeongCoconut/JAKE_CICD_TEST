import React from "react";

import { button } from "@repo/styles/themes";

import * as S from "./ExternalLinkButton.styled";

interface ExternalLinkButtonProps {
  className?: string;
  variant: keyof typeof button;
  href: string;
  children: React.ReactNode;
}

const ExternalLinkButton = ({
  className,
  variant,
  href,
  children,
}: ExternalLinkButtonProps) => {
  return (
    <S.ExternalLinkButton
      className={className}
      variant={variant}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </S.ExternalLinkButton>
  );
};

export default ExternalLinkButton;
