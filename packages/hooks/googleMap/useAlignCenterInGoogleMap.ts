import { isEmpty } from "lodash-es";

import { useGoogleMap } from "@repo/contexts/GoogleMapProvider";
import type { LatLng } from "@repo/types";

interface AlignCenterProps {
  paddingLeft: number;
  fitBoundsPadding: number;
}

const useAlignCenterInGoogleMap = ({
  paddingLeft,
  fitBoundsPadding,
}: AlignCenterProps) => {
  const { googleMap } = useGoogleMap();

  const alignCenterInGoogleMap = (latLngs: LatLng[]): void => {
    if (!latLngs || isEmpty(latLngs)) return;
    if (!googleMap) return;

    const latlngbounds = new google.maps.LatLngBounds();

    latLngs.forEach((latLng) => latlngbounds.extend(latLng));
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
