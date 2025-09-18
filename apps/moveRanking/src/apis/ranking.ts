import { is, validate } from "typia";

import { apiDebug } from "@repo/stores/apiDebug";
import { sanitizeTypiaErrors } from "@repo/utils/api";

import { ax } from "~apis";
import type { GetDriverRankingServerModel } from "~types";

// LINK: https://www.notion.so/coconutsilo/ranking-c273ed471fd34db7a777dc91d1fb2127?pvs=4
export const getDriversRankingAPI = async () => {
  const path = "/ranking";
  const { data } = await ax.get<GetDriverRankingServerModel>(path);

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetDriverRankingServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetDriverRankingServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetDriverRankingServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};
