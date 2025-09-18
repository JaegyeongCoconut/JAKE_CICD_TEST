import { useForm } from "react-hook-form";

import type { RecursiveUndefined } from "@repo/types";

import type {
  CarInspectionClientItem,
  FormInspectionCheckItems,
  GetInspectionChecklistClientModel,
} from "~types";

const INIT_FORM = {
  isCompleted: true,
  exteriorCount: 0,
  interiorCount: 0,
  undersideCount: 0,
  engineCount: 0,
  exteriorChecklist: [],
  interiorChecklist: [],
  engineChecklist: [],
  undersideChecklist: [],
};

interface UseInspectionCheckItemsPanelProps {
  data: GetInspectionChecklistClientModel | undefined;
}

const useTabPanel = ({ data }: UseInspectionCheckItemsPanelProps) => {
  const filteredStatusCount = (
    list: RecursiveUndefined<CarInspectionClientItem[]> | undefined,
  ): number => {
    if (!list) return 0;

    return list.filter((item) => !!item?.status).length;
  };

  const formMethod = useForm<FormInspectionCheckItems>({
    defaultValues: INIT_FORM,
    values: data
      ? {
          isCompleted: true,
          exteriorCount: filteredStatusCount(data.exteriorChecklist),
          interiorCount: filteredStatusCount(data.interiorChecklist),
          undersideCount: filteredStatusCount(data.undersideChecklist),
          engineCount: filteredStatusCount(data.engineChecklist),
          exteriorChecklist:
            data.exteriorChecklist?.map((list) => ({
              no: list?.no === undefined || list.no === null ? 0 : list.no,
              title: list?.title ?? "",
              titleEn: list?.titleEn ?? "",
              titleLo: list?.titleLo ?? "",
              photos: list?.photos
                ? list.photos.filter((photo) => photo !== undefined)
                : [],
              status: list?.status ?? "",
              remark: list?.remark ?? "",
              isVisible:
                list?.isVisible === undefined || list.isVisible === null
                  ? 0
                  : list.isVisible,
            })) ?? [],
          interiorChecklist:
            data.interiorChecklist?.map((list) => ({
              no: list?.no === undefined || list.no === null ? 0 : list.no,
              title: list?.title ?? "",
              titleEn: list?.titleEn ?? "",
              titleLo: list?.titleLo ?? "",
              photos: list?.photos
                ? list.photos.filter((photo) => photo !== undefined)
                : [],
              status: list?.status ?? "",
              remark: list?.remark ?? "",
              isVisible:
                list?.isVisible === undefined || list.isVisible === null
                  ? 0
                  : list.isVisible,
            })) ?? [],
          undersideChecklist:
            data.undersideChecklist?.map((list) => ({
              no: list?.no === undefined || list.no === null ? 0 : list.no,
              title: list?.title ?? "",
              titleEn: list?.titleEn ?? "",
              titleLo: list?.titleLo ?? "",
              photos: list?.photos
                ? list.photos.filter((photo) => photo !== undefined)
                : [],
              status: list?.status ?? "",
              remark: list?.remark ?? "",
              isVisible:
                list?.isVisible === undefined || list.isVisible === null
                  ? 0
                  : list.isVisible,
            })) ?? [],
          engineChecklist:
            data.engineChecklist?.map((list) => ({
              no: list?.no === undefined || list.no === null ? 0 : list.no,
              title: list?.title ?? "",
              titleEn: list?.titleEn ?? "",
              titleLo: list?.titleLo ?? "",
              photos: list?.photos
                ? list.photos.filter((photo) => photo !== undefined)
                : [],
              status: list?.status ?? "",
              remark: list?.remark ?? "",
              isVisible:
                list?.isVisible === undefined || list.isVisible === null
                  ? 0
                  : list.isVisible,
            })) ?? [],
        }
      : INIT_FORM,
    // NOTE: completed 버튼이 눌리고 로직을 검사하는 것이 맞다고 판단하여 onSubmit
    mode: "onSubmit",
  });

  return { formMethod };
};

export default useTabPanel;
