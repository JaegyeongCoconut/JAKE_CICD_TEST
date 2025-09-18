import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object } from "yup";

import { comma } from "@repo/utils/formatter/currency";
import { SCHEMA } from "@repo/utils/yup/schema";

import type {
  FormInspectionDefaultInfo,
  GetInspectionDetailClientModel,
} from "~types";

const INIT_FORM = {
  code: "",
  inspectedBy: "",
  inspectedDate: "",
  frameNo: "",
  engineNo: "",
  maker: "",
  model: "",
  carType: "",
  color: "",
  year: "",
  mileage: "",
  fuel: "",
  transmission: "",
};

const schema = object({
  code: SCHEMA.DEFINED_NULLABLE_STRING,
  inspectedBy: SCHEMA.DEFINED_NULLABLE_STRING,
  inspectedDate: SCHEMA.DEFINED_NULLABLE_STRING,
  frameNo: SCHEMA.REQUIRED_STRING(),
  engineNo: SCHEMA.REQUIRED_STRING(),
  maker: SCHEMA.REQUIRED_STRING(),
  model: SCHEMA.REQUIRED_STRING(),
  carType: SCHEMA.REQUIRED_STRING(),
  color: SCHEMA.REQUIRED_STRING(),
  year: SCHEMA.REQUIRED_STRING(),
  mileage: SCHEMA.REQUIRED_STRING(),
  fuel: SCHEMA.REQUIRED_STRING(),
  transmission: SCHEMA.REQUIRED_STRING(),
});

const useDefaultInfoForm = (
  data: GetInspectionDetailClientModel | undefined,
) => {
  const formMethod = useForm<FormInspectionDefaultInfo>({
    defaultValues: INIT_FORM,
    values: data
      ? {
          code: data.code ?? INIT_FORM.code,
          inspectedBy: data?.admin?.name ?? INIT_FORM.inspectedBy,
          inspectedDate: data.completed ?? INIT_FORM.inspectedDate,
          frameNo: data.usedCarStock
            ? (data.usedCarStock.frameNo ?? INIT_FORM.frameNo)
            : INIT_FORM.frameNo,
          engineNo: data.usedCarStock
            ? (data.usedCarStock.engineNo ?? INIT_FORM.engineNo)
            : INIT_FORM.engineNo,
          maker: data?.usedCarStock?.maker?.name ?? INIT_FORM.maker,
          model: data.usedCarStock
            ? (data.usedCarStock.model ?? INIT_FORM.model)
            : INIT_FORM.model,
          carType: data?.usedCarStock?.carType?.name ?? INIT_FORM.carType,
          color: data?.usedCarStock?.color?.code ?? INIT_FORM.color,
          year: data.usedCarStock
            ? data.usedCarStock.year === null ||
              data.usedCarStock.year === undefined
              ? INIT_FORM.year
              : `${data.usedCarStock.year}`
            : INIT_FORM.year,
          mileage: data.usedCarStock
            ? data.usedCarStock.mileage === null ||
              data.usedCarStock.mileage === undefined
              ? INIT_FORM.mileage
              : `${comma(data.usedCarStock.mileage)}`
            : INIT_FORM.mileage,
          fuel: data?.usedCarStock?.fuel?.code ?? INIT_FORM.fuel,
          transmission:
            data?.usedCarStock?.transmission?.name ?? INIT_FORM.transmission,
        }
      : INIT_FORM,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useDefaultInfoForm;
