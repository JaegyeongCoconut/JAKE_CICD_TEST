import { useEffect } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useVerifyAccountStore } from "@repo/stores/verifyAccount";
import type { CreateNewPasswordFormType } from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

const CREATE_NEW_PASSWORD_INIT_FORM = { newPassword: "", confirmPassword: "" };

const schema = yup.object({
  newPassword: SCHEMA.REQUIRED_STRING.test(
    TEST.PASSWORD.TYPE.name,
    TEST.PASSWORD.TYPE.message,
    TEST.PASSWORD.TYPE.test,
  ).test(
    TEST.PASSWORD.LENGTH.name,
    TEST.PASSWORD.LENGTH.message,
    TEST.PASSWORD.LENGTH.test,
  ),
  confirmPassword: SCHEMA.REQUIRED_STRING.test(
    TEST.PASSWORD.CONFIRM.name,
    TEST.PASSWORD.CONFIRM.message,
    function (value) {
      return TEST.PASSWORD.CONFIRM.test(value, this); //NOTE: 화살표 함수로는 this 객체를 넘길 수 없음
    },
  ),
});

const useCreateNewPassword = (path: string) => {
  const navigate = useNavigate();

  const verifyInfo = useVerifyAccountStore((state) => state.verifyInfo);
  const resetVerifyInfo = useVerifyAccountStore(
    (state) => state.resetVerifyInfo,
  );

  const formMethod = useForm<CreateNewPasswordFormType>({
    defaultValues: CREATE_NEW_PASSWORD_INIT_FORM,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!verifyInfo.authCode) {
      navigate(`/${path}`);
    }

    return () => {
      resetVerifyInfo();
    };
  }, []);

  return { formMethod };
};

export default useCreateNewPassword;
