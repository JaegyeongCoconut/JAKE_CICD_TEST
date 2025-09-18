import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object } from "yup";

import type { FormLogin } from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

const LOGIN_INIT_FORM = {
  email: "",
  password: "",
};

const schema = object({
  email: SCHEMA.REQUIRED_STRING().test(TEST.TRIM()).test(TEST.EMAIL),
  password: SCHEMA.REQUIRED_STRING(),
});

const useLoginForm = () => {
  const formMethod = useForm<FormLogin>({
    defaultValues: LOGIN_INIT_FORM,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useLoginForm;
