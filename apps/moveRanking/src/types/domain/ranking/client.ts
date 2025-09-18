import type { RecursiveUndefined } from "@repo/types";

import type { DriverRankItem } from "~types";

export type GetDriverRankingClientModel = RecursiveUndefined<{
  averageProfit: number;
  averageTransport: number;
  drivers: DriverRankItem[];
  updated: string;
}>;
