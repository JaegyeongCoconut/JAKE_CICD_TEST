import React from "react";

import { useModalStore } from "@repo/stores/modal";
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
  const handleModalClose = useModalStore((state) => state.handleModalClose);

  return (
    <DetailModal
      css={S.detailModal}
      ref={ref}
      isPositiveDisabled
      description={description}
      positiveButtonName="Select"
      title={title}
      handleClose={handleModalClose}
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
