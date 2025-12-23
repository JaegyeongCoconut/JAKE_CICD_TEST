import React, { forwardRef } from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useInitGoogleMapMarker from "@repo/hooks/googleMap/useInitGoogleMapMarker";
import useSetMapCenterInGoogleMap from "@repo/hooks/googleMap/useSetMapCenterInGoogleMap";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useModalStore } from "@repo/stores/modal";
import type { Languages, LatLng } from "@repo/types";

import * as S from "./PositionGoogleMapModal.styled";
import useMapClickMarkerChangeGoogleMap from "./hooks/useMapClickMarkerChangeGoogleMap";
import GoogleMap from "../../googleMap/GoogleMap";
import DetailModal from "../detail/DetailModal";

interface PositionGoogleMapModalProps {
  initLat: number;
  initLng: number;
  positiveButtonName: Languages;
  title: Languages;
  handleLatLngUpdate: ({ lat, lng }: LatLng) => void;
}

const PositionGoogleMapModal = forwardRef<
  HTMLDialogElement,
  PositionGoogleMapModalProps
>(
  (
    { title, initLat, initLng, positiveButtonName, handleLatLngUpdate },
    ref,
  ) => {
    const handleModalClose = useModalStore((state) => state.handleModalClose);

    const { defaultLanguage } = useDefaultLanguage();
    useSetMapCenterInGoogleMap({ lat: initLat, lng: initLng }, 15);

    const marker = useInitGoogleMapMarker({
      lat: initLat,
      lng: initLng,
    });
    const latLng = positiveButtonName
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
        isPositiveDisabled={false}
        isPositiveLoading={false}
        description={undefined}
        positiveButtonName={positiveButtonName}
        title={title}
        handleClose={handleModalClose}
        handlePositiveButtonClick={handleUpdateLatLng}
      >
        <S.LatLngWrapper>
          <div>
            <S.Label>
              {defaultLanguage({ text: LANGUAGE_LABEL.LATITUDE })}
            </S.Label>
            <S.Content>
              {latLng ? latLng.lat.toFixed(8) : initLat.toFixed(8)}
            </S.Content>
          </div>
          <div>
            <S.Label>
              {defaultLanguage({ text: LANGUAGE_LABEL.LONGITUDE })}
            </S.Label>
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
  },
);

PositionGoogleMapModal.displayName = "PositionGoogleMapModal";
export default PositionGoogleMapModal;
