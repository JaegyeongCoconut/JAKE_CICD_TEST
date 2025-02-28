import React from "react";

import { Link } from "react-router-dom";

import { button } from "@repo/styles/themes";

import * as S from "./InternalLinkButton.styled";

interface InternalLinkProps {
  className?: string;
  disabled?: boolean;
  variant: keyof typeof button;
  state?: { [key: string]: any }; // NOTE: 타입 추정이 어려워 any 작성
  to: string;
  children: React.ReactNode;
}

const InternalLinkButton = ({
  className,
  children,
  variant,
  state,
  to: path,
}: InternalLinkProps) => {
  return (
    <Link
      css={S.internalLink(variant)}
      className={className}
      to={path}
      state={state}
    >
      {children}
    </Link>
  );
};

export default InternalLinkButton;
