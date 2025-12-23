import { useEffect, useState } from "react";

import useGoogleMap from "@repo/hooks/useGoogleMap";
import type { LatLng } from "@repo/types";

interface UseMapClickMarkerChangeGoogleMapProps {
  lat: number;
  lng: number;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const useMapClickMarkerChangeGoogleMap = ({
  marker,
  lat,
  lng,
}: UseMapClickMarkerChangeGoogleMapProps) => {
  const { googleMap } = useGoogleMap();
  const [latLng, setLatLng] = useState<LatLng>({ lat, lng });

  useEffect(() => {
    if (!googleMap || !marker) return;

    const clickListener = googleMap.addListener(
      "click",
      (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const newLat = event.latLng.lat();
          const newLng = event.latLng.lng();

          marker.position = { lat: newLat, lng: newLng };
          setLatLng({ lat: newLat, lng: newLng });
          googleMap.panTo({ lat: newLat, lng: newLng });
        }
      },
    );

    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [marker]);

  return latLng;
};

export default useMapClickMarkerChangeGoogleMap;
