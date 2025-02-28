import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import type { VerificationType } from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";

const VERIFICATION_CODE_INIT_FORM = {
  verificationCode: "",
};

const schema = yup.object({
  verificationCode: SCHEMA.REQUIRED_STRING,
});

const useVerificationCode = () => {
  const formMethod = useForm<VerificationType>({
    defaultValues: VERIFICATION_CODE_INIT_FORM,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useVerificationCode;
