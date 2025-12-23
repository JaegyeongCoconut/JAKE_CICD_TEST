import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useOnClickOutside from "@repo/hooks/useOnClickOutside";
import type { BreadcrumbItemType } from "@repo/types";

import * as S from "./BreadcrumbDropdown.styled";

interface BreadcrumbDropdownProps {
  className?: string;
  breadcrumbs: BreadcrumbItemType[];
}

const BreadcrumbDropdown = ({
  className,
  breadcrumbs,
}: BreadcrumbDropdownProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [clicked, setClicked] = useState(false);

  useOnClickOutside({
    ref: dropdownRef,
    handler: () => setClicked(false),
    exceptEl: undefined,
  });

  const handlePageBreadcrumbDropdownButtonClick = (): void => setClicked(true);

  useEffect(() => {
    setShowTooltip(
      anchorRef.current
        ? anchorRef.current.scrollWidth > anchorRef.current.clientWidth
        : false,
    );
  }, [clicked]);

  return (
    <S.BreadcrumbDropdown className={className} ref={dropdownRef}>
      <S.BreadcrumbDropdownButton
        type="button"
        onClick={handlePageBreadcrumbDropdownButtonClick}
      >
        <span>...</span>
      </S.BreadcrumbDropdownButton>
      {clicked && (
        <S.BreadcrumbDropdownUl>
          {breadcrumbs.map(({ isTranslated, name, path }) => {
            const breadcrumbName = isTranslated
              ? defaultLanguage({ text: name })
              : name;

            return (
              <S.BreadcrumbDropdownLi
                key={name}
                data-show-tooltip={showTooltip}
                content={breadcrumbName}
                showTooltip={showTooltip}
              >
                <Link key={name} ref={anchorRef} to={path ?? ""}>
                  {breadcrumbName}
                </Link>
              </S.BreadcrumbDropdownLi>
            );
          })}
        </S.BreadcrumbDropdownUl>
      )}
    </S.BreadcrumbDropdown>
  );
};

export default BreadcrumbDropdown;
