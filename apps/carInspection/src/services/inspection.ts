import type {
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import usePreventDuplicateMutation from "@repo/hooks/usePreventDuplicateMutation";
import type { RecursiveUndefined } from "@repo/types";

import {
  getColorsAPI,
  getFuelTypesAPI,
  getInspectionAPI,
  getInspectionDetailAPI,
  getTransmissionsAPI,
  updateInspectionChecklistAPI,
  updateInspectionCompletedAPI,
  updateInspectionDefaultInfoAPI,
} from "~apis";
import { colorKeys, fuelTypeKeys, transmissionKeys } from "~services";
import type {
  ApiErrorType,
  GetColorsClientModel,
  GetColorsServerModel,
  GetFuelTypesClientModel,
  GetFuelTypesServerModel,
  GetInspectionChecklistClientModel,
  GetInspectionDetailClientModel,
  GetInspectionDetailServerModel,
  GetInspectionQueryModel,
  GetInspectionsClientModel,
  GetInspectionServerModel,
  GetTransmissionsClientModel,
  GetTransmissionsServerModel,
  UpdateInspectionChecklistQueryModel,
  UpdateInspectionDefaultInfoQueryModel,
} from "~types";

export const inspectionKeys = {
  all: ["device"] as const,
  lists: () => [...inspectionKeys.all, "list"] as const,
  list: (queryFilters: GetInspectionQueryModel) =>
    [...inspectionKeys.lists(), queryFilters] as const,
  details: () => [...inspectionKeys.all, "detail"] as const,
  detail: (inspectionId: string) =>
    [...inspectionKeys.details(), inspectionId] as const,
  checkLists: () => [...inspectionKeys.all, "checkList"] as const,
  checkList: (inspectionId: string) =>
    [...inspectionKeys.checkLists(), inspectionId] as const,
} as const;

interface UseGetInspectionProps {
  enabled: boolean;
  req: GetInspectionQueryModel;
}

export const useGetInspection = ({
  req,
  enabled,
}: UseGetInspectionProps): UseInfiniteQueryResult<GetInspectionsClientModel> =>
  useInfiniteQuery({
    queryKey: inspectionKeys.list(req),
    queryFn: ({ pageParam }) =>
      getInspectionAPI({
        query: { ...req.query, nextCursor: pageParam },
      }),
    getNextPageParam: (
      lastPage: RecursiveUndefined<GetInspectionServerModel>,
    ) => lastPage?.nextCursor,
    select: (data) =>
      data && {
        pages: data.pages.map(
          (page) =>
            page &&
            page.inspections && {
              inspections: page.inspections.map((inspection) => ({
                id: inspection?.id,
                usedCarStock: inspection?.usedCarStock,
              })),
              nextCursor: page.nextCursor,
            },
        ),
        pageParams: data.pageParams,
      },
    enabled,
  });

export const useGetInspectionDetail = (
  inspectionId: string,
): [
  UseQueryResult<GetInspectionDetailClientModel>,
  UseQueryResult<GetColorsClientModel>,
  UseQueryResult<GetFuelTypesClientModel>,
  UseQueryResult<GetTransmissionsClientModel>,
] =>
  useQueries({
    queries: [
      {
        queryKey: inspectionKeys.detail(inspectionId),
        queryFn: () => getInspectionDetailAPI(inspectionId),
        select: (res: RecursiveUndefined<GetInspectionDetailServerModel>) =>
          res && {
            code: res.code,
            admin: res.admin && { name: res.admin.name },
            usedCarStock: res.usedCarStock,
            completed: res.completed,
          },
      },
      {
        queryKey: colorKeys.colors(),
        queryFn: () => getColorsAPI({ query: {} }),
        select: (res: RecursiveUndefined<GetColorsServerModel>) =>
          res && {
            colors: res.colors?.map((color) => ({
              code: color?.code,
              en: color?.nameEn,
              lo: color?.nameLo,
            })),
            pageInfo: res.pageInfo,
          },
      },
      {
        queryKey: fuelTypeKeys.fuelTypes(),
        queryFn: () => getFuelTypesAPI({ query: {} }),
        select: (res: RecursiveUndefined<GetFuelTypesServerModel>) =>
          res && {
            fuelTypes: res.fuelTypes?.map((fuel) => ({
              code: fuel?.code,
              name: fuel?.name,
            })),
            pageInfo: res.pageInfo,
          },
      },
      {
        queryKey: transmissionKeys.transmissions(),
        queryFn: () => getTransmissionsAPI({ query: {} }),
        select: (res: RecursiveUndefined<GetTransmissionsServerModel>) =>
          res && {
            transmissions: res.transmissions?.map((transmission) => ({
              code: transmission?.code,
              name: transmission?.name,
            })),
            pageInfo: res.pageInfo,
          },
      },
    ],
  });

export const useUpdateInspectionDefaultInfo = () => {
  const queryClient = useQueryClient();

  return usePreventDuplicateMutation<
    unknown,
    ApiErrorType,
    UpdateInspectionDefaultInfoQueryModel
  >({
    mutationKey: [uuidv4()],
    mutationFn: updateInspectionDefaultInfoAPI,
    options: {
      onSuccess: (_, req) =>
        queryClient.invalidateQueries(inspectionKeys.detail(req.inspectionId)),
    },
  });
};

export const useGetInspectionCarCheckList = (
  inspectionId: string,
): UseQueryResult<GetInspectionChecklistClientModel> =>
  useQuery({
    queryKey: inspectionKeys.checkList(inspectionId),
    queryFn: () => getInspectionDetailAPI(inspectionId),
    select: (res) =>
      res && {
        exteriorChecklist: res.info && res.info.exteriorChecklist,
        interiorChecklist: res.info && res.info.interiorChecklist,
        undersideChecklist: res.info && res.info.underbodyChecklist,
        engineChecklist: res.info && res.info.engineChecklist,
      },
  });

export const useUpdateInspectionChecklist = () => {
  const queryClient = useQueryClient();

  return usePreventDuplicateMutation<
    unknown,
    ApiErrorType,
    UpdateInspectionChecklistQueryModel
  >({
    mutationKey: [uuidv4()],
    mutationFn: updateInspectionChecklistAPI,
    options: {
      onSuccess: () =>
        queryClient.invalidateQueries(inspectionKeys.checkLists()),
    },
  });
};

export const useUpdateInspectionCompleted = () => {
  const queryClient = useQueryClient();

  return usePreventDuplicateMutation<unknown, ApiErrorType, string>({
    mutationKey: [uuidv4()],
    mutationFn: updateInspectionCompletedAPI,
    options: {
      onSuccess: () => queryClient.invalidateQueries(inspectionKeys.lists()),
    },
  });
};
