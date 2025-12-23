import { isEmpty } from "lodash-es";

import type { LatLng, RecursiveUndefined } from "@repo/types";

import useGoogleMap from "../useGoogleMap";

interface AlignCenterProps {
  paddingLeft: number;
  fitBoundsPadding: number;
}

const useAlignCenterInGoogleMap = ({
  paddingLeft,
  fitBoundsPadding,
}: AlignCenterProps) => {
  const { googleMap } = useGoogleMap();

  const alignCenterInGoogleMap = (
    latLngs: RecursiveUndefined<LatLng>[],
  ): void => {
    if (!latLngs || isEmpty(latLngs)) return;
    if (!googleMap) return;

    const latlngbounds = new google.maps.LatLngBounds();

    latLngs.forEach((latLng) => {
      if (!latLng || !latLng.lat || !latLng.lng) return;

      latlngbounds.extend({ lat: latLng.lat, lng: latLng.lng });
    });
    googleMap.fitBounds(latlngbounds, {
      top: fitBoundsPadding,
      left: fitBoundsPadding + paddingLeft,
      bottom: fitBoundsPadding,
      right: fitBoundsPadding,
    });
  };

  return { alignCenterInGoogleMap };
};

export default useAlignCenterInGoogleMap;
