import { useEffect } from "react";

import type { LatLng } from "@repo/types";

import useGoogleMap from "../useGoogleMap";

const useSetMapCenterInGoogleMap = (center: LatLng, zoom: number) => {
  const { googleMap } = useGoogleMap();

  useEffect(() => {
    if (!googleMap) return;

    googleMap.setOptions({ center, zoom });
  }, [googleMap]);
};

export default useSetMapCenterInGoogleMap;
