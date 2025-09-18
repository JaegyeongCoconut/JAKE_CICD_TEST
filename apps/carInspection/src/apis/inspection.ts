import { is, validate } from "typia";

import { apiDebug } from "@repo/stores/apiDebug";
import { sanitizeTypiaErrors } from "@repo/utils/api";

import { ax } from "~apis";
import type {
  GetInspectionDetailServerModel,
  GetInspectionQueryModel,
  GetInspectionServerModel,
  UpdateInspectionChecklistQueryModel,
  UpdateInspectionDefaultInfoQueryModel,
} from "~types";

// LINK: https://www.notion.so/coconutsilo/usedcars-inspections-b1f420adc1ab4d338c27f3cea497c44d?pvs=4
export const getInspectionAPI = async (req: GetInspectionQueryModel) => {
  const path = "/usedcars/inspections";
  const { data } = await ax.get<GetInspectionServerModel>(path, {
    params: req.query,
  });

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetInspectionServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetInspectionServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetInspectionServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};

// LINK: https://www.notion.so/coconutsilo/usedcars-inspections-inspectionId-229b500d401f49079349b55a80265841?pvs=4
export const getInspectionDetailAPI = async (inspectionId: string) => {
  const path = `/usedcars/inspections/${inspectionId}`;
  const { data } = await ax.get<GetInspectionDetailServerModel>(path);

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetInspectionDetailServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetInspectionDetailServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetInspectionDetailServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};

// LINK: https://www.notion.so/coconutsilo/usedcars-inspections-inspectionId-f8112c42e37344f090c6ba3ecdbddd35?pvs=4
export const updateInspectionDefaultInfoAPI = (
  req: UpdateInspectionDefaultInfoQueryModel,
) => ax.patch(`/usedcars/inspections/${req.inspectionId}`, req.body);

// LINK: https://www.notion.so/coconutsilo/usedcars-inspections-inspectionId-items-itemNo-50fe931ab66846f38ed3ce83dc0c1fa1?pvs=4
export const updateInspectionChecklistAPI = (
  req: UpdateInspectionChecklistQueryModel,
) =>
  ax.patch(
    `/usedcars/inspections/${req.inspectionId}/items/${req.itemNo}`,
    req.body,
  );

// LINK: https://www.notion.so/coconutsilo/usedcars-inspections-inspectionId-completed-a8d34fa4dcee4e618df18c482ed66f19?pvs=4
export const updateInspectionCompletedAPI = (inspectionId: string) =>
  ax.post(`/usedcars/inspections/${inspectionId}/completed`);
