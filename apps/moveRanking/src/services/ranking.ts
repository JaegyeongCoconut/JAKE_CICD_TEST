import { useQuery } from "@tanstack/react-query";

import { getDriversRankingAPI } from "~apis";

export const useGetDriversRanking = () =>
  useQuery({
    queryKey: ["driverRanking"],
    queryFn: () => getDriversRankingAPI(),
  });
