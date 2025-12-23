import { useRef, useEffect } from "react";

import { useGoogleMapStore } from "@repo/stores/googleMap";

const useGoogleMap = () => {
  const ref = useRef(null);
  const { googleMap, setGoogleMap } = useGoogleMapStore();

  useEffect(() => {
    if (ref.current && (!googleMap || googleMap.getDiv() !== ref.current)) {
      const map = new google.maps.Map(ref.current, {
        streetViewControl: false,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        /* NOTE: 
           description :고급 마커를 사용하기 위해서는 mapId가 필요, 아직 지도 ID가 없으므로 'DEMO_MAP_ID'를 사용
           link1: 고급 마커 - https://developers.google.com/maps/documentation/javascript/advanced-markers/migration?hl=ko
           lint2: 고급 마커의 properties - https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
           link3: 지도 ID - https://developers.google.com/maps/documentation/get-map-id?hl=ko
        */
        mapId: "DEMO_MAP_ID",
      });

      setGoogleMap(map);

      return () => {
        setGoogleMap(null);
      };
    }
  }, [setGoogleMap]);

  return { ref, googleMap };
};

export default useGoogleMap;
