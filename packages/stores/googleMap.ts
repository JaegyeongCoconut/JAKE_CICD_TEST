import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface GoogleMapState {
  googleMap: google.maps.Map | null;
  setGoogleMap: (map: google.maps.Map | null) => void;
}

export const useGoogleMapStore = create<GoogleMapState>()(
  immer((set) => ({
    googleMap: null,
    setGoogleMap: (map): void => set({ googleMap: map }),
  })),
);
