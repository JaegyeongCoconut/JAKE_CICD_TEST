import type { RecursiveUndefined } from "@repo/types";

import { ax } from "~apis";
import type { LoginQueryModel, LoginServerModel } from "~types";

export const loginAPI = async (req: LoginQueryModel) => {
  const { data } = await ax.post<RecursiveUndefined<LoginServerModel>>(
    "/auth/signin",
    req,
  );

  return data;
};

export const logoutAPI = () => ax.post("/auth/signout");
