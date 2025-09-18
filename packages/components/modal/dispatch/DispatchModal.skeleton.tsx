import React from "react";

import type { Languages } from "@repo/types";

import * as S from "./DispatchModal.styled";
import DetailModal from "../detail/DetailModal";
import DispatchDriverListSkeleton from "./containers/driver/DispatchDriverList.skeleton";
import DispatchVehicleListSkeleton from "./containers/vehicle/DispatchVehicleList.skeleton";

interface DispatchModalSkeletonProps {
  description: Languages;
  title: Languages;
}

const DispatchModalSkeleton = React.forwardRef<
  HTMLDialogElement,
  DispatchModalSkeletonProps
>(({ title, description }, ref) => {
  return (
    <DetailModal
      css={S.detailModal}
      ref={ref}
      isPosLoading={false}
      desc={description}
      posButtonName="Select"
      title={title}
    >
      <S.ListWrapper>
        <DispatchDriverListSkeleton />
        <DispatchVehicleListSkeleton />
      </S.ListWrapper>
    </DetailModal>
  );
});

DispatchModalSkeleton.displayName = "DispatchModalSkeleton";

export default DispatchModalSkeleton;
