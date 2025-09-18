import React, { useRef } from "react";

import { useGetDriversRanking } from "~services";

import ButtonField from "./containers/buttonField/ButtonField";
import HeaderInfo from "./containers/headerInfo/HeaderInfo";
import List from "./containers/list/List";

const Layer = () => {
  const rankingListRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { data } = useGetDriversRanking();

  return (
    <>
      <HeaderInfo data={data} />
      <List data={data} rankingListRefs={rankingListRefs} />
      <ButtonField data={data} rankingListRefs={rankingListRefs} />
    </>
  );
};

export default Layer;
