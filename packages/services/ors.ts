import { v4 as uuidv4 } from "uuid";

import { postOrsRouteAPI } from "@repo/apis/ors";
import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import usePreventDuplicateMutation from "@repo/hooks/usePreventDuplicateMutation";
import { useToastStore } from "@repo/stores/toast";
import type { LatLng, OrsRes } from "@repo/types";

export const useMutateOrsRoute = (
  displayOrsPolylinesInGoogleMap: (orsRoutes: OrsRes) => void,
) => {
  const addToast = useToastStore((state) => state.addToast);

  return usePreventDuplicateMutation<
    OrsRes,
    { response: { data: { error: { code: number } } } },
    LatLng[]
  >({
    mutationKey: [uuidv4()],
    mutationFn: postOrsRouteAPI,
    options: {
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
    },
  });
};
