import React, {
  useMemo,
  useState,
  createContext,
  useRef,
  useContext,
  useEffect,
  type JSX,
} from "react";

export const GoogleMapContext = createContext<{
  googleMap: google.maps.Map | null;
  setGoogleMap: ((map: google.maps.Map | null) => void) | null;
}>({
  googleMap: null,
  setGoogleMap: null,
});

export const useGoogleMap = () => {
  const ref = useRef(null);

  const { googleMap, setGoogleMap } = useContext(GoogleMapContext);

  useEffect(() => {
    if (ref.current && setGoogleMap) {
      const map = new google.maps.Map(ref.current, {
        streetViewControl: false,
        mapTypeId: "hybrid",
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
  }, []);

  return { ref, googleMap };
};

export const GoogleMapProvider = ({ children }: { children: JSX.Element }) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

  const value = useMemo(() => ({ googleMap, setGoogleMap }), [googleMap]);

  return (
    <GoogleMapContext.Provider value={value}>
      {children}
    </GoogleMapContext.Provider>
  );
};
