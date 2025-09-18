import React, { useRef } from "react";

import NoResult from "@repo/components/noResult";

import { LANGUAGE_LABEL } from "~constants";
import { useGetInspection } from "~services";
import type { GetInspectionQueryModel } from "~types";

import * as S from "./Section.styled";
import Header from "./containers/header/Header";
import ListBody from "./containers/list/body/ListBody";
import ListHeader from "./containers/list/header/ListHeader";

interface SectionProps {
  isInitQueryFilter: boolean;
  req: GetInspectionQueryModel;
}

const Section = ({ req, isInitQueryFilter }: SectionProps) => {
  const observerRef = useRef<HTMLAnchorElement | null>(null);

  const { dataUpdatedAt, data, refetch } = useGetInspection({
    req,
    enabled: !!req.query.brand && !isInitQueryFilter,
  });
  const inspections = data?.pages.flatMap((page) => page?.inspections);
  const totalInsepctionLength = inspections?.length ?? 0;

  return (
    <>
      <Header
        dataUpdatedAt={dataUpdatedAt}
        length={totalInsepctionLength}
        onRefetch={refetch}
      />
      <S.ListWrapper>
        <ListHeader />
        <S.ListItemWrapper>
          {isInitQueryFilter ? (
            <NoResult
              css={S.noResult}
              contents={[LANGUAGE_LABEL.PLEASE_APPLY_THE_FILTER_TO_SEARCH]}
              type="select"
            />
          ) : !totalInsepctionLength ? (
            <NoResult
              css={S.noResult}
              contents={[LANGUAGE_LABEL.NO_RESULTS_FOUND]}
              type="search"
            />
          ) : (
            inspections?.map((inspection, i) => (
              <ListBody
                key={inspection?.id ?? i}
                ref={inspections?.length - 1 === i ? observerRef : null}
                data={inspection}
              />
            ))
          )}
        </S.ListItemWrapper>
      </S.ListWrapper>
    </>
  );
};

export default Section;
