import axios from "axios";

import type { RenewAccessTokenServerModel } from "@repo/types";

export const renewAccessTokenAPI = async (
  url: string,
  refreshToken: string,
) => {
  const { data } = await axios.get<RenewAccessTokenServerModel>(url, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  return data;
};
