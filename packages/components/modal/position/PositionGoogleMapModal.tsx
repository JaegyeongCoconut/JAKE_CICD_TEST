import React, { forwardRef } from "react";

import { useTranslation } from "react-i18next";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useInitGoogleMapMarker from "@repo/hooks/googleMap/useInitGoogleMapMarker";
import useSetMapCenterInGoogleMap from "@repo/hooks/googleMap/useSetMapCenterInGoogleMap";
import useModal from "@repo/hooks/modal/useModal";
import type { Languages, LatLng } from "@repo/types";

import * as S from "./PositionGoogleMapModal.styled";
import GoogleMap from "../../googleMap/GoogleMap";
import DetailModal from "../detail/DetailModal";
import useMapClickMarkerChangeGoogleMap from "./hooks/useMapClickMarkerChangeGoogleMap";

interface PositionGoogleMapModalProps {
  initLat: number;
  initLng: number;
  posButtonName?: Languages;
  title: Languages;
  handleLatLngUpdate?: ({ lat, lng }: LatLng) => void;
}

const PositionGoogleMapModal = forwardRef<
  HTMLDialogElement,
  PositionGoogleMapModalProps
>(({ title, initLat, initLng, posButtonName, handleLatLngUpdate }, ref) => {
  const { t } = useTranslation();

  const { handleModalClose } = useModal();
  useSetMapCenterInGoogleMap({ lat: initLat, lng: initLng }, 15);

  const marker = useInitGoogleMapMarker({
    lat: initLat,
    lng: initLng,
  });
  const latLng = posButtonName
    ? useMapClickMarkerChangeGoogleMap({
        marker,
        lat: initLat,
        lng: initLng,
      })
    : null;

  const handleUpdateLatLng = (): void => {
    latLng
      ? handleLatLngUpdate &&
        handleLatLngUpdate({ lat: latLng.lat, lng: latLng.lng })
      : null;
    handleModalClose();
  };

  return (
    <DetailModal
      ref={ref}
      isPosLoading={false}
      posButtonName={posButtonName}
      title={title}
      handlePosButtonClick={handleUpdateLatLng}
    >
      <S.LatLngWrapper>
        <div>
          <S.Label>{t(LANGUAGE_LABEL.LATITUDE)}</S.Label>
          <S.Content>
            {latLng ? latLng.lat.toFixed(8) : initLat.toFixed(8)}
          </S.Content>
        </div>
        <div>
          <S.Label>{t(LANGUAGE_LABEL.LONGITUDE)}</S.Label>
          <S.Content>
            {latLng ? latLng.lng.toFixed(8) : initLng.toFixed(8)}
          </S.Content>
        </div>
      </S.LatLngWrapper>
      <S.GoogleMapWrapper>
        <GoogleMap />
      </S.GoogleMapWrapper>
    </DetailModal>
  );
});

PositionGoogleMapModal.displayName = "PositionGoogleMapModal";
export default PositionGoogleMapModal;
