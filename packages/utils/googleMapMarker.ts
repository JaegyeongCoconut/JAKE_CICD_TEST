import type { LatLng } from "@repo/types";

interface GetMarkerProps {
  position: LatLng;
  zIndex: number;
  map: google.maps.Map;
  src: string;
}

export const createGoogleMapMarker = ({
  map,
  position,
  src,
  zIndex,
}: GetMarkerProps) =>
  new google.maps.marker.AdvancedMarkerElement({
    map,
    position,
    content: createGoogleMapMarkerIcon(src),
    zIndex,
  });

export const createGoogleMapMarkerIcon = (src: string): HTMLImageElement => {
  const markerIcon = document.createElement("img");
  markerIcon.src = src;
  markerIcon.style.pointerEvents = "auto";

  return markerIcon;
};
