import React from "react";

import type { button } from "@repo/styles/themes";

import * as S from "./ExternalLinkButton.styled";

interface ExternalLinkButtonProps {
  className?: string;
  href: string;
  variant: keyof typeof button;
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
      href={href}
      variant={variant}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </S.ExternalLinkButton>
  );
};

export default ExternalLinkButton;
