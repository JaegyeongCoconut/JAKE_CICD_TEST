import React, { useState } from "react";

import useModal from "@repo/hooks/modal/useModal";
import useToast from "@repo/hooks/useToast";
import type {
  Languages,
  DispatchDriver,
  DispatchVehicle,
  ToastType,
} from "@repo/types";

import * as S from "./DispatchModal.styled";
import DetailModal from "../detail/DetailModal";
import DispatchDriverList from "./containers/driver/DispatchDriverList";
import DispatchVehicleList from "./containers/vehicle/DispatchVehicleList";

interface DispatchModalProps {
  description: Languages;
  driverList: DispatchDriver[];
  selectedDriverId: string | null;
  selectedVehicleId: string | null;
  title: Languages;
  toastMessage?: Omit<ToastType, "id">;
  vehicleList: DispatchVehicle[];
  handleDriverSelect: (drivers: DispatchDriver[], driverId: string) => void;
  handleVehicleSelect: (vehicles: DispatchVehicle[], vehicleId: string) => void;
}

const DispatchModal = React.forwardRef<HTMLDialogElement, DispatchModalProps>(
  (
    {
      title,
      description,
      toastMessage,
      driverList,
      vehicleList,
      selectedDriverId,
      selectedVehicleId,
      handleDriverSelect,
      handleVehicleSelect,
    },
    ref,
  ) => {
    const [searchedDriverName, setSearchedDriverName] = useState<string | null>(
      null,
    );
    const [searchedPlateNumber, setSearchedPlateNumber] = useState<
      string | null
    >(null);
    const [selectedDriver, setSelectedDriver] = useState<string | null>(
      selectedDriverId || null,
    );
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
      selectedVehicleId || null,
    );

    const { handleModalClose } = useModal();
    const { addToast } = useToast();

    const handleDriverNameSearch = (searchedDriverName: string): void => {
      setSearchedDriverName(searchedDriverName);
    };
    const handlePlateNumberSearch = (searchedPlateNumber: string): void => {
      setSearchedPlateNumber(searchedPlateNumber);
    };
    const handleDriverIdSelect = (driverId: string | undefined) => (): void => {
      setSelectedDriver(
        !driverId || selectedDriver === driverId ? null : driverId,
      );
    };
    const handleVehicleIdSelect =
      (vehicleId: string | undefined) => (): void => {
        setSelectedVehicle(
          !vehicleId || selectedVehicle === vehicleId ? null : vehicleId,
        );
      };
    const handleDriverVehicleSelect = (): void => {
      if (!selectedDriver || !selectedVehicle || !driverList || !vehicleList)
        return;

      handleDriverSelect(driverList, selectedDriver);
      handleVehicleSelect(vehicleList, selectedVehicle);
      handleModalClose();
      toastMessage && addToast(toastMessage);
    };

    return (
      <DetailModal
        css={S.detailModal}
        ref={ref}
        isPosDisabled={!selectedDriver || !selectedVehicle}
        isPosLoading={false}
        desc={description}
        posButtonName="Select"
        title={title}
        handlePosButtonClick={handleDriverVehicleSelect}
      >
        <S.ListWrapper>
          <DispatchDriverList
            driverList={driverList}
            searchedDriver={searchedDriverName}
            selectedDriverId={selectedDriver}
            handleDriverIdSelect={handleDriverIdSelect}
            handleDriverSearch={handleDriverNameSearch}
          />
          <DispatchVehicleList
            searchedVehicle={searchedPlateNumber}
            selectedVehicleId={selectedVehicle}
            vehicleList={vehicleList}
            handleVehicleIdSelect={handleVehicleIdSelect}
            handleVehicleSearch={handlePlateNumberSearch}
          />
        </S.ListWrapper>
      </DetailModal>
    );
  },
);

DispatchModal.displayName = "DispatchModal";

export default DispatchModal;
