import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useFilterStore } from "@repo/stores/filter";
import type { Languages } from "@repo/types";

import * as S from "./Breadcrumb.styled";
import BreadcrumbDropdown from "./containers/dropdown/BreadcrumbDropdown";

interface BreadcrumbProps {
  className?: string;
  breadcrumbs: { name: Languages; path?: string }[];
}

const Breadcrumb = ({ className, breadcrumbs }: BreadcrumbProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const breadcrumbRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [hasDropdown, setHasDropdown] = useState(false);

  const isInitFilter = useFilterStore((state) => state.isInitFilter);
  const setIsInitFilter = useFilterStore((state) => state.setIsInitFilter);

  const MAX_BREADCRUMB_LENGTH = 648 as const;

  const lastIndex = breadcrumbs.length - 1;

  const handleBreadcrumbClick =
    (breadcrumb: { name: Languages; path?: string }, i: number) => (): void => {
      const isLastPath = lastIndex === i;
      if (isLastPath) return;
      if (!breadcrumb.path) return;

      if (isInitFilter) return;
      setIsInitFilter(true);
    };

  useEffect(() => {
    const totalLength = breadcrumbRefs.current.reduce((sum, liElement) => {
      if (liElement) {
        return sum + liElement.offsetWidth;
      }
      return sum;
    }, 0);

    if (totalLength >= MAX_BREADCRUMB_LENGTH && breadcrumbs.length >= 3) {
      setHasDropdown(true);
    } else {
      setHasDropdown(false);
    }
  }, [breadcrumbs]);

  return (
    <S.PageLayoutBreadcrumb className={className}>
      {hasDropdown ? (
        <>
          <S.PageLayoutBreadcrumbLi
            key={breadcrumbs[0].name}
            content={defaultLanguage(breadcrumbs[0].name)}
            hasEllipsis={breadcrumbs[0].name.length >= 52}
          >
            <Link
              css={S.breadcrumb(!!breadcrumbs[0]?.path)}
              to={breadcrumbs[0].path ?? ""}
              tabIndex={0}
              onClick={handleBreadcrumbClick(breadcrumbs[0], 0)}
            >
              {defaultLanguage(breadcrumbs[0].name)}
            </Link>
          </S.PageLayoutBreadcrumbLi>
          <S.PageLayoutBreadcrumbLi hasEllipsis={false} content={""}>
            <BreadcrumbDropdown breadcrumbs={breadcrumbs.slice(1, -1)} />
          </S.PageLayoutBreadcrumbLi>
          <S.PageLayoutBreadcrumbLi
            key={breadcrumbs[lastIndex].name}
            content={defaultLanguage(breadcrumbs[lastIndex].name)}
            hasEllipsis={breadcrumbs[lastIndex].name.length >= 52}
          >
            <S.LastSpan hasEllipsis={breadcrumbs[lastIndex].name.length >= 52}>
              {defaultLanguage(breadcrumbs[lastIndex].name)}
            </S.LastSpan>
          </S.PageLayoutBreadcrumbLi>
        </>
      ) : (
        breadcrumbs.map((breadcrumb, i) => (
          <S.PageLayoutBreadcrumbLi
            key={breadcrumb.name + i}
            ref={(el) => (breadcrumbRefs.current[i] = el)}
            content={defaultLanguage(breadcrumb.name)}
            hasEllipsis={breadcrumb.name.length >= 52}
          >
            {i === lastIndex ? (
              <S.LastSpan hasEllipsis={breadcrumb.name.length >= 52}>
                {defaultLanguage(breadcrumb.name)}
              </S.LastSpan>
            ) : (
              <Link
                css={S.breadcrumb(!!breadcrumb?.path)}
                to={breadcrumb.path ?? ""}
                tabIndex={i === lastIndex ? -1 : 0}
                onClick={handleBreadcrumbClick(breadcrumb, i)}
              >
                {defaultLanguage(breadcrumb.name)}
              </Link>
            )}
          </S.PageLayoutBreadcrumbLi>
        ))
      )}
    </S.PageLayoutBreadcrumb>
  );
};

export default Breadcrumb;
