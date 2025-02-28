import { useMutation } from "@tanstack/react-query";

import { postOrsRouteAPI } from "@repo/apis/ors";
import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import useToast from "@repo/hooks/useToast";
import type { LatLng, OrsRes } from "@repo/types";

export const useMutateOrsRoute = (
  displayOrsPolylinesInGoogleMap: (orsRoutes: OrsRes) => void,
) => {
  const { addToast } = useToast();

  return useMutation<
    OrsRes,
    { response: { data: { error: { code: number } } } },
    LatLng[]
  >({
    mutationFn: (latLngs: LatLng[]) => postOrsRouteAPI(latLngs),
    onSuccess: (res) => {
      displayOrsPolylinesInGoogleMap(res);
    },
    onError: (error) => {
      switch (error.response.data.error.code) {
        // NOTE: 2,000km 이상 경로 탐색 불가
        case 2004:
          addToast(COMMON_TOAST_MESSAGE.WARNING.ROUTE_DISTANCE_EXCEED);
          break;
        default:
          addToast(COMMON_TOAST_MESSAGE.WARNING.CANNOT_FIND_ROUTABLE_POINT);
          break;
      }
    },
  });
};
