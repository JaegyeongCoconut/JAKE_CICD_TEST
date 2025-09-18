import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { getMakersAPI } from "~apis";
import type { GetMakersClientModel } from "~types";

export const colorKeys = {
  all: ["colors"] as const,
  colors: () => [...colorKeys.all, "colors"] as const,
  color: () => [...colorKeys.colors()] as const,
};

export const fuelTypeKeys = {
  all: ["fuelTypes"] as const,
  fuelTypes: () => [...fuelTypeKeys.all, "fuelTypes"] as const,
  fuelType: () => [...fuelTypeKeys.fuelTypes()] as const,
};

export const makerKeys = {
  all: ["makers"] as const,
  makers: () => [...makerKeys.all, "makers"] as const,
  maker: () => [...makerKeys.makers()] as const,
};

export const transmissionKeys = {
  all: ["transmissions"] as const,
  transmissions: () => [...transmissionKeys.all, "transmissions"] as const,
  transmission: () => [...transmissionKeys.transmissions()] as const,
};

export const useGetMakers = (): UseQueryResult<GetMakersClientModel> =>
  useQuery({
    queryKey: makerKeys.makers(),
    queryFn: () => getMakersAPI({ query: {} }),
    select: (res) =>
      res && {
        makers: res.makers?.map((maker) => ({
          code: maker?.code,
          name: maker?.name,
        })),
        pageInfo: res.pageInfo,
      },
  });
