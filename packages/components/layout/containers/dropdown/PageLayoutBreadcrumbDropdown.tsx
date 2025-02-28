import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { useDefaultLanguage, useOnClickOutside } from "@repo/hooks";
import type { Languages } from "@repo/types";

import * as S from "./PageLayoutBreadcrumbDropdown.styled";

interface PageLayoutBreadcrumbDropdownProps {
  className?: string;
  breadcrumbs: { name: Languages; path?: string }[];
}

const PageLayoutBreadcrumbDropdown = ({
  className,
  breadcrumbs,
}: PageLayoutBreadcrumbDropdownProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [clicked, setClicked] = useState(false);

  useOnClickOutside(dropdownRef, () => setClicked(false));

  const handlePageBreadcrumbDropdownButtonClick = (): void => setClicked(true);

  useEffect(() => {
    setShowTooltip(
      anchorRef.current
        ? anchorRef.current.scrollWidth > anchorRef.current.clientWidth
        : false,
    );
  }, [clicked]);

  return (
    <S.PageLayoutBreadcrumbDropdown className={className} ref={dropdownRef}>
      <S.PageLayoutBreadcrumbDropdownButton
        type="button"
        onClick={handlePageBreadcrumbDropdownButtonClick}
      >
        <span>...</span>
      </S.PageLayoutBreadcrumbDropdownButton>
      {clicked && (
        <S.PageLayoutBreadcrumbDropdownUl>
          {breadcrumbs.map(({ name, path }) => {
            return (
              <S.PageLayoutBreadcrumbDropdownLi
                key={name}
                content={defaultLanguage(name)}
                showTooltip={showTooltip}
              >
                <Link key={name} ref={anchorRef} to={path ?? ""}>
                  {defaultLanguage(name)}
                </Link>
              </S.PageLayoutBreadcrumbDropdownLi>
            );
          })}
        </S.PageLayoutBreadcrumbDropdownUl>
      )}
    </S.PageLayoutBreadcrumbDropdown>
  );
};

export default PageLayoutBreadcrumbDropdown;
