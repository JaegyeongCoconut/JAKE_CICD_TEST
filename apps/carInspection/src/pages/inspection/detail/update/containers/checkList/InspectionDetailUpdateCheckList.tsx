import React, { lazy, Suspense } from "react";

import LayerSkeleton from "./containers/layer/Layer.skeleton";

const Layer = lazy(() => import("./containers/layer/Layer"));

const InspectionDetailUpdateCheckList = () => {
  return (
    <Suspense fallback={<LayerSkeleton />}>
      <Layer />
    </Suspense>
  );
};

export default InspectionDetailUpdateCheckList;
