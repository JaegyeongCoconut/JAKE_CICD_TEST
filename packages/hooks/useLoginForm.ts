import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { LoginFormType } from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

const LOGIN_INIT_FORM = {
  email: "",
  password: "",
};

const schema = yup.object({
  email: SCHEMA.REQUIRED_STRING.test(
    TEST.TRIM.name,
    TEST.TRIM.message,
    TEST.TRIM.test,
  ).test(TEST.EMAIL.name, TEST.EMAIL.message, TEST.EMAIL.test),
  password: SCHEMA.REQUIRED_STRING,
});

const useLoginForm = () => {
  const formMethod = useForm<LoginFormType>({
    defaultValues: LOGIN_INIT_FORM,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return { formMethod };
};

export default useLoginForm;
