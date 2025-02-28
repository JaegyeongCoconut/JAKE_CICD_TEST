import axios from "axios";

import type { LatLng, OrsRes } from "@repo/types";

// LINK: https://www.notion.so/coconutsilo/ors-v2-directions-profile-6b9aba612e254aa49f4c7ae86d1fc186
export const postOrsRouteAPI = async (latLngs: LatLng[]) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? import.meta.env.VITE_ORS_BASE_URL_DEPLOY
      : import.meta.env.VITE_ORS_BASE_URL_LOCAL_DEV;

  const { data } = await axios.post<OrsRes>(
    `${baseUrl}/ors/v2/directions/driving-car/geojson`,
    { coordinates: latLngs.map(({ lat, lng }) => [+lng, +lat]) },
  );

  return data;
};
