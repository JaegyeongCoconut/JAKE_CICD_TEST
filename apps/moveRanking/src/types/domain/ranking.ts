interface DriverRankItem {
  id: string;
  firstName: string;
  lastName: string;
  totalTransport: number;
  totalProfit: number;
}

export interface GetDriverRankingServerModel {
  averageTransport: number;
  averageProfit: number;
  updated: string;
  drivers: DriverRankItem[];
}
