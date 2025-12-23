import { useEffect, useRef, useState } from "react";

import GoogleMarkerSvg from "@repo/assets/icon/ic_google_marker.svg";
import useGoogleMap from "@repo/hooks/useGoogleMap";
import { zIndex } from "@repo/styles/themes";

interface UseInitGoogleMapMarkerProps {
  lat: number;
  lng: number;
}

const useInitGoogleMapMarker = ({ lat, lng }: UseInitGoogleMapMarkerProps) => {
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null,
  );

  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const { googleMap } = useGoogleMap();

  useEffect(() => {
    if (!googleMap) return;

    const initMarker = async () => {
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        map: googleMap,
        position: { lat, lng },
        zIndex: zIndex.GOOGLE_MAP_BRANCH_MARKER,
        content: createCustomIconElement(),
      });

      markerRef.current = newMarker;
      setMarker(newMarker);
    };

    initMarker();

    return () => {
      if (markerRef.current) markerRef.current.map = null;
    };
  }, [googleMap]);

  const createCustomIconElement = (): HTMLElement => {
    const img = document.createElement("img");
    img.src = GoogleMarkerSvg;
    img.style.width = "40px";
    img.style.height = "40px";

    return img;
  };

  return marker;
};

export default useInitGoogleMapMarker;
