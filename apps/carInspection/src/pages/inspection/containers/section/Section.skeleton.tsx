import React from "react";

import DataSectionSkeleton from "@repo/components/dataSectionSkeleton";
import TableSkeleton from "@repo/components/table/tableSkeleton";

import { INSPECTION_TABLE_HEADER_INFOS } from "~assets";
import { LANGUAGE_LABEL } from "~constants";

const SectionSkeleton = () => {
  return (
    <DataSectionSkeleton activeButtons={null} title={LANGUAGE_LABEL.LIST}>
      <TableSkeleton
        rowCount={10}
        tableHeaderInfos={INSPECTION_TABLE_HEADER_INFOS}
      />
    </DataSectionSkeleton>
  );
};

export default SectionSkeleton;
