/* 
   NOTE: 위/경도 타입 구분

   1. lat, lng => LatLng
   2. x, y => Coord
*/
export interface LatLng {
  lat: number;
  lng: number;
}

export interface Coord {
  x: number; // NOTE: 경도, lng
  y: number; // NOTE: 위도, lat
}

export type LoadType = "pickup" | "dropoff";

export interface OrsRes {
  features: { geometry: { coordinates: [number, number][] } }[];
}
