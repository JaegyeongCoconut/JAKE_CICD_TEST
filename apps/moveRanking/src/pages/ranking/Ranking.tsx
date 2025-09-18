import React, { Suspense, lazy } from "react";

import * as S from "./Ranking.styled";
import LayerSkeleton from "./containers/layer/Layer.skeleton";

const Layer = lazy(() => import("./containers/layer/Layer"));

const Ranking = () => {
  return (
    <S.Main>
      <Suspense fallback={<LayerSkeleton />}>
        <Layer />
      </Suspense>
    </S.Main>
  );
};

export default Ranking;
