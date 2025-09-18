import React, { lazy, Suspense } from "react";

import { Header } from "~components";
import { LANGUAGE_LABEL, PATH } from "~constants";

import LayerSkeleton from "./containers/layer/Layer.skeleton";

const Layer = lazy(() => import("./containers/layer/Layer"));

const InspectionDetailUpdateDefaultInfo = () => {
  return (
    <section>
      <Header>
        <Header.BackLinkButton to={`/${PATH.INSPECTION}`} />
        <Header.Title title={LANGUAGE_LABEL.CAR_INSPECTION} />
      </Header>
      <Suspense fallback={<LayerSkeleton />}>
        <Layer />
      </Suspense>
    </section>
  );
};

export default InspectionDetailUpdateDefaultInfo;
