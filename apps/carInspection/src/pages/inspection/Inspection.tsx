import React, { lazy, Suspense } from "react";

import { Header } from "~components";
import { LANGUAGE_LABEL } from "~constants";

import FilterSkeleton from "./containers/filter/Filter.skeleton";
import SectionSkeleton from "./containers/section/Section.skeleton";
import useQueryParams from "./hooks/useQueryParams";

const Filter = lazy(() => import("./containers/filter/Filter"));
const Section = lazy(() => import("./containers/section/Section"));

const Inspection = () => {
  const { req, isInitQueryFilter } = useQueryParams();

  return (
    <section>
      <Header>
        <Header.Title title={LANGUAGE_LABEL.CARS_REQUIRE_INSPECTION} />
        <Header.LogoutButton />
      </Header>
      <Suspense fallback={<FilterSkeleton />}>
        <Filter />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Section isInitQueryFilter={isInitQueryFilter} req={req} />
      </Suspense>
    </section>
  );
};

export default Inspection;
