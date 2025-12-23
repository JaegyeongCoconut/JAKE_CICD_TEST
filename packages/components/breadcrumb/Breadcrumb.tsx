import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import {
  BREADCRUMB_DROPDOWN_TRIGGER_THRESHOLD,
  BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD,
  BREADCRUMB_MAX_LENGTH,
} from "@repo/constants/breadcrumb";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useQueryFilterStore } from "@repo/stores/queryFilter";
import type { BreadcrumbItemType } from "@repo/types";

import * as S from "./Breadcrumb.styled";
import BreadcrumbDropdown from "./containers/dropdown/BreadcrumbDropdown";

interface BreadcrumbProps {
  className?: string;
  breadcrumbs: BreadcrumbItemType[];
}

const Breadcrumb = ({ className, breadcrumbs }: BreadcrumbProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const breadcrumbRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [hasDropdown, setHasDropdown] = useState(false);

  const isInitQueryFilter = useQueryFilterStore(
    (state) => state.isInitQueryFilter,
  );
  const setIsInitQueryFilter = useQueryFilterStore(
    (state) => state.setIsInitQueryFilter,
  );

  const lastIndex = breadcrumbs.length - 1;

  const translatedBreadcrumbs = (breadcrumb: BreadcrumbItemType): string =>
    breadcrumb.isTranslated
      ? defaultLanguage({ text: breadcrumb.name })
      : breadcrumb.name;

  const handleBreadcrumbClick =
    (breadcrumb: BreadcrumbItemType, i: number) => (): void => {
      const isLastPath = lastIndex === i;
      if (isLastPath) return;
      if (!breadcrumb.path) return;

      if (isInitQueryFilter) return;
      setIsInitQueryFilter(true);
    };

  useEffect(() => {
    const totalLength = breadcrumbRefs.current.reduce((sum, liElement) => {
      if (liElement) {
        return sum + liElement.offsetWidth;
      }
      return sum;
    }, 0);

    if (
      totalLength >= BREADCRUMB_MAX_LENGTH &&
      breadcrumbs.length >= BREADCRUMB_DROPDOWN_TRIGGER_THRESHOLD
    ) {
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
            hasEllipsis={
              translatedBreadcrumbs(breadcrumbs[0]).length >=
              BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD
            }
            content={translatedBreadcrumbs(breadcrumbs[0])}
          >
            <Link
              css={S.breadcrumb(!!breadcrumbs[0].path)}
              tabIndex={0}
              to={breadcrumbs[0].path}
              onClick={handleBreadcrumbClick(breadcrumbs[0], 0)}
            >
              {translatedBreadcrumbs(breadcrumbs[0])}
            </Link>
          </S.PageLayoutBreadcrumbLi>
          <S.PageLayoutBreadcrumbLi hasEllipsis={false} content={""}>
            <BreadcrumbDropdown breadcrumbs={breadcrumbs.slice(1, -1)} />
          </S.PageLayoutBreadcrumbLi>
          <S.PageLayoutBreadcrumbLi
            key={breadcrumbs[lastIndex].name}
            hasEllipsis={
              translatedBreadcrumbs(breadcrumbs[lastIndex]).length >=
              BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD
            }
            content={translatedBreadcrumbs(breadcrumbs[lastIndex])}
          >
            <S.LastSpan
              hasEllipsis={
                translatedBreadcrumbs(breadcrumbs[lastIndex]).length >=
                BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD
              }
            >
              {translatedBreadcrumbs(breadcrumbs[lastIndex])}
            </S.LastSpan>
          </S.PageLayoutBreadcrumbLi>
        </>
      ) : (
        breadcrumbs.map((breadcrumb, i) => (
          <S.PageLayoutBreadcrumbLi
            key={breadcrumb.name + i}
            ref={(el) => (breadcrumbRefs.current[i] = el)}
            hasEllipsis={
              translatedBreadcrumbs(breadcrumb).length >=
              BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD
            }
            content={translatedBreadcrumbs(breadcrumb)}
          >
            {i === lastIndex ? (
              <S.LastSpan
                hasEllipsis={
                  translatedBreadcrumbs(breadcrumb).length >=
                  BREADCRUMB_ELLIPSIS_TRIGGER_THRESHOLD
                }
              >
                {translatedBreadcrumbs(breadcrumb)}
              </S.LastSpan>
            ) : (
              <Link
                css={S.breadcrumb(!!breadcrumb.path)}
                tabIndex={i === lastIndex ? -1 : 0}
                to={breadcrumb.path}
                onClick={handleBreadcrumbClick(breadcrumb, i)}
              >
                {translatedBreadcrumbs(breadcrumb)}
              </Link>
            )}
          </S.PageLayoutBreadcrumbLi>
        ))
      )}
    </S.PageLayoutBreadcrumb>
  );
};

export default Breadcrumb;
