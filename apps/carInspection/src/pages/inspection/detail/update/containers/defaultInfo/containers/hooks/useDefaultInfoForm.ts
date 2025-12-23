import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { comma } from "@repo/utils/formatter/currency";

import type { GetInspectionDetailClientModel } from "~types";

import {
  schema,
  type DefaultInfoFormSchema,
} from "../schema/defaultInfoForm.schema";

const INIT_FORM: DefaultInfoFormSchema = {
  code: "",
  color: "",
  year: "",
  mileage: "",
  fuel: "",
  transmission: "",
};

const useDefaultInfoForm = (
  data: GetInspectionDetailClientModel | undefined,
) => {
  const formMethod = useForm<DefaultInfoFormSchema>({
    defaultValues: INIT_FORM,
    values: data
      ? {
          code: data.code ?? INIT_FORM.code,
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
    resolver: zodResolver(schema),
  });

  return { formMethod };
};

export default useDefaultInfoForm;
