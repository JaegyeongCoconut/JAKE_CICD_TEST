import axios from "axios";
import { is, validate } from "typia";

import { apiDebug } from "@repo/stores/apiDebug";
import type { S3PresignedServerModel } from "@repo/types";
import { sanitizeTypiaErrors } from "@repo/utils/api";
import { getS3FileFormData } from "@repo/utils/file";

import { ax } from "~apis";
import type {
  GetColorsQueryModel,
  GetColorsServerModel,
  GetFuelTypesQueryModel,
  GetFuelTypesServerModel,
  GetMakersQueryModel,
  GetMakersServerModel,
  GetTransmissionsQueryModel,
  GetTransmissionsServerModel,
} from "~types";

// LINK: https://www.notion.so/coconutsilo/common-presigned-key-298307aae9a54c13972c20b0f596e7a3?pvs=4
export const createS3PresignedUrlAPI = async (key: string, file: File) => {
  const res: S3PresignedServerModel = await ax.post(`/common/presigned/${key}`);

  const formData = getS3FileFormData({ s3Info: res, file });

  return await axios.post(res.data.url, formData);
};

// LINK: https://www.notion.so/coconutsilo/common-makers-a5d1552356d64e44be647809d21d1dbc?pvs=4
export const getMakersAPI = async (req: GetMakersQueryModel) => {
  const path = "/common/makers";
  const { data } = await ax.get<GetMakersServerModel>(path, {
    params: req.query,
  });

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetMakersServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetMakersServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetMakersServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};

// LINK: https://www.notion.so/coconutsilo/common-colors-3a681c50f11e4beda9fd698c550d5a53?pvs=4
export const getColorsAPI = async (req: GetColorsQueryModel) => {
  const path = "/common/colors";
  const { data } = await ax.get<GetColorsServerModel>(path, {
    params: req.query,
  });

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetColorsServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetColorsServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetColorsServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};

// LINK: https://www.notion.so/coconutsilo/common-fueltypes-e1660b9fbce64bc285572454491bb9d0?pvs=4
export const getFuelTypesAPI = async (req: GetFuelTypesQueryModel) => {
  const path = "/common/fueltypes";
  const { data } = await ax.get<GetFuelTypesServerModel>(path, {
    params: req.query,
  });

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetFuelTypesServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetFuelTypesServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetFuelTypesServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};

// LINK: https://www.notion.so/coconutsilo/common-transmissions-c1e0ece8f5da4176b31c7571af09d0e9?pvs=4
export const getTransmissionsAPI = async (req: GetTransmissionsQueryModel) => {
  const path = "/common/transmissions";
  const { data } = await ax.get<GetTransmissionsServerModel>(path, {
    params: req.query,
  });

  if (!import.meta.env.VITE_USE_TYPIA) return data;

  const isMatched = is<GetTransmissionsServerModel>(data);

  if (isMatched) {
    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onClearLog(path);

    return data;
  }

  const response = validate<GetTransmissionsServerModel>(data);

  if (!response.success) {
    const sanitizedData = sanitizeTypiaErrors<GetTransmissionsServerModel>({
      path,
      data,
      errors: response.errors,
    });

    process.env.NODE_ENV === "development" &&
      apiDebug.getState().onSetLog({ path, errors: response.errors });

    return sanitizedData;
  }
};
