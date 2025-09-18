import axios from "axios";

import type { LatLng, OrsRes } from "@repo/types";

// LINK: https://www.notion.so/coconutsilo/ors-v2-directions-profile-6b9aba612e254aa49f4c7ae86d1fc186
export const postOrsRouteAPI = async (latLngs: LatLng[]) => {
  const { data } = await axios.post<OrsRes>(
    `${import.meta.env.VITE_ORS_BASE_URL}/ors/v2/directions/driving-car/geojson`,
    { coordinates: latLngs.map(({ lat, lng }) => [+lng, +lat]) },
  );

  return data;
};
