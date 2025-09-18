import React from "react";

import HeaderInfoSkeleton from "./containers/headerInfo/HeaderInfo.skeleton";
import ListSkeleton from "./containers/list/List.skeleton";

const LayerSkeleton = () => {
  return (
    <>
      <HeaderInfoSkeleton />
      <ListSkeleton />
    </>
  );
};

export default LayerSkeleton;
