import { useEffect } from "react";

import { useGoogleMap } from "@repo/contexts/GoogleMapProvider";
import type { LatLng } from "@repo/types";

const useSetMapCenterInGoogleMap = (center: LatLng, zoom: number) => {
  const { googleMap } = useGoogleMap();

  useEffect(() => {
    if (!googleMap) return;

    googleMap.setOptions({ center, zoom });
  }, [googleMap]);
};

export default useSetMapCenterInGoogleMap;
