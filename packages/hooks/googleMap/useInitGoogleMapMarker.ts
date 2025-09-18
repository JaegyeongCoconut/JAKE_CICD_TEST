import { useEffect, useState } from "react";

import MarkerSvg from "@repo/assets/icon/ic_marker.svg";
import { useGoogleMap } from "@repo/contexts/GoogleMapProvider";
import { zIndex } from "@repo/styles/themes";

interface UseInitGoogleMapMarkerProps {
  lat: number;
  lng: number;
}

const useInitGoogleMapMarker = ({ lat, lng }: UseInitGoogleMapMarkerProps) => {
  const { googleMap } = useGoogleMap();
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  useEffect(() => {
    if (!googleMap) return;

    const initMarker = async () => {
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        map: googleMap,
        position: { lat, lng },
        zIndex: zIndex.GOOGLE_MAP_BRANCH_MARKER,
        content: createCustomIconElement(),
      });

      setMarker(newMarker);
    };

    initMarker();

    return () => {
      if (marker) marker.map = null;
    };
  }, [googleMap]);

  const createCustomIconElement = (): HTMLElement => {
    const img = document.createElement("img");
    img.src = MarkerSvg;
    img.style.width = "40px";
    img.style.height = "40px";

    return img;
  };

  return marker;
};

export default useInitGoogleMapMarker;
