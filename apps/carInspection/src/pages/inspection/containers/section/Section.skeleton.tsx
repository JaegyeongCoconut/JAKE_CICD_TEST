import React from "react";

import DataSectionSkeleton from "@repo/components/dataSectionSkeleton";
import TableSkeleton from "@repo/components/table/tableSkeleton";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";

const SectionSkeleton = () => {
  return (
    <DataSectionSkeleton>
      <TableSkeleton tableHeaderInfos={INSPECTION_TABLE_HEADER_INFOS} />
    </DataSectionSkeleton>
  );
};

export default SectionSkeleton;
