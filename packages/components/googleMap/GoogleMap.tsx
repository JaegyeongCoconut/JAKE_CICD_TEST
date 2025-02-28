import React from "react";

import { useGoogleMap } from "@repo/contexts/GoogleMapProvider";

import * as S from "./GoogleMap.styled";

interface GoogleMapProps {
  className?: string;
}

const GoogleMap = ({ className }: GoogleMapProps) => {
  const { ref } = useGoogleMap();

  return <S.GoogleMap ref={ref} className={className} />;
};

export default GoogleMap;
