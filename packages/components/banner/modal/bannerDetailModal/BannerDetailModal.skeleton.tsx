import React from "react";

import type { Languages } from "@repo/types";

import LabelContentTableSkeleton from "../../../label/table/content/LabelContentTable.skeleton";
import DetailModal from "../../../modal/detail/DetailModal";

interface BannerDetailModalSkeletonProps {
  infos: readonly (readonly { key: string; heading: Languages }[])[];
}

const BannerDetailModalSkeleton = React.forwardRef<
  HTMLDialogElement,
  BannerDetailModalSkeletonProps
>(({ infos }, ref) => {
  return (
    <DetailModal
      ref={ref}
      title="Banner details"
      negButtonName="Delete banner"
      posButtonName="Edit banner"
      isPosLoading={false}
    >
      <LabelContentTableSkeleton variant="bg" info={infos} />
    </DetailModal>
  );
});

BannerDetailModalSkeleton.displayName = "BannerDetailModalSkeleton";

export default BannerDetailModalSkeleton;
