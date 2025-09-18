import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { getDriversRankingAPI } from "~apis";
import type { GetDriverRankingClientModel } from "~types";

export const useGetDriversRanking =
  (): UseQueryResult<GetDriverRankingClientModel> =>
    useQuery({
      queryKey: ["driverRanking"],
      queryFn: () => getDriversRankingAPI(),
    });
