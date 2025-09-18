import type { FC, SVGProps } from "react";
import React from "react";

import type { jsx } from "@emotion/react";
import { Link } from "react-router-dom";

import type { button } from "@repo/styles/themes";

import * as S from "./InternalLinkButton.styled";

interface BaseInternalLinkButtonProps {
  className?: string;
  // NOTE: ButtonVariant 와 다른 속성들을 사용하고 있어 작성
  // NOTE: 예) ghost, ghost_red는 ButtonVariant에 없음
  variant: keyof typeof button | "iconOnly";
  hasBoth: boolean; // NOTE: icon, label을 둘다 사용하는 곳이 있어 작성
  state?: { [key: string]: any }; // NOTE: 타입 추정이 어려워 any 작성
  to: string;
}

interface IconOnlyInternalLinkButtonProps extends BaseInternalLinkButtonProps {
  variant: "iconOnly";
  hasBoth: false;
  Icon: FC<SVGProps<SVGSVGElement>>;
  label?: never;
}

interface LabelInternalLinkButtonProps extends BaseInternalLinkButtonProps {
  variant: keyof typeof button;
  hasBoth: false;
  Icon?: never;
  label: string;
}

interface BothInternalLinkButtonProps extends BaseInternalLinkButtonProps {
  variant: keyof typeof button;
  hasBoth: true;
  Icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
}

const InternalLinkButton = ({
  className,
  hasBoth,
  Icon,
  label,
  variant,
  state,
  to: path,
}:
  | IconOnlyInternalLinkButtonProps
  | LabelInternalLinkButtonProps
  | BothInternalLinkButtonProps) => {
  const renderer = (): jsx.JSX.Element => {
    if (hasBoth)
      return (
        <>
          <Icon />
          <span>{label}</span>
        </>
      );

    if (variant === "iconOnly") return <Icon />;

    return <span>{label}</span>;
  };

  return (
    <Link
      css={S.internalLink(variant)}
      className={className}
      state={state}
      to={path}
    >
      {renderer()}
    </Link>
  );
};

export default InternalLinkButton;
