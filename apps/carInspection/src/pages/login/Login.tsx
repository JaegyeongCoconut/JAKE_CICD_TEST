import React from "react";

import { FormProvider } from "react-hook-form";

import LoginForm from "@repo/components/form/login";
import useLoginForm from "@repo/hooks/useLoginForm";
import type { FormLogin } from "@repo/types";
import { encryptWithSha256 } from "@repo/utils/crypto";

import { LogoCarInspectionIcon } from "~assets";
import { ERROR_MESSAGE, ERROR_CODE } from "~constants";
import { useLogin } from "~services";
import type { LoginQueryModel } from "~types";

import * as S from "./Login.styled";

const Login = () => {
  const { isLoading, mutate: loginMutate } = useLogin();

  const { formMethod } = useLoginForm();

  const handleLogin = (data: FormLogin) => {
    const req: LoginQueryModel = {
      email: data.email,
      password: encryptWithSha256(data.password),
    } as const;

    loginMutate(req, {
      onError: (error) => {
        switch (error.response?.data.message) {
          case ERROR_CODE.INVALID_SIGNIN:
            formMethod.setError("email", {
              message: ERROR_MESSAGE.SIGNIN_FAILED,
            });
        }
      },
    });
  };

  return (
    <FormProvider {...formMethod}>
      <LoginForm
        isLoading={isLoading}
        logoIcon={<LogoCarInspectionIcon css={S.logo} />}
        handleLogin={handleLogin}
      />
    </FormProvider>
  );
};

export default Login;
