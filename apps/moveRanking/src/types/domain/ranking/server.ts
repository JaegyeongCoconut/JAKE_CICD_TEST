export interface DriverRankItem {
  id: string;
  firstName: string;
  lastName: string;
  totalProfit: number;
  totalTransport: number;
}

export interface GetDriverRankingServerModel {
  averageProfit: number;
  averageTransport: number;
  drivers: DriverRankItem[];
  updated: string;
}
