import { ax } from "~apis";
import type { GetDriverRankingServerModel } from "~types";

// LINK: https://www.notion.so/coconutsilo/ranking-c273ed471fd34db7a777dc91d1fb2127?pvs=4
export const getDriversRankingAPI = async () => {
  const { data } = await ax.get<GetDriverRankingServerModel>("/ranking");

  return data;
};
