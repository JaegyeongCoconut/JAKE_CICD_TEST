import React from "react";

import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { LoginFormType } from "@repo/types";

import * as S from "./LoginForm.styled";
import Button from "../../button/Button";
import Heading from "../../heading/Heading";
import AccountInput from "../../input/accountInput/AccountInput";
import ErrorMessage from "../../message/ErrorMessage";

interface LoginFormProps {
  logoIcon: React.ReactNode;
  resetPasswordPath?: string;
  handleLogin: (data: LoginFormType) => void;
  isLoading: boolean;
}

const LoginForm = ({
  logoIcon,
  resetPasswordPath,
  handleLogin,
  isLoading,
}: LoginFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    control,
    formState: { errors },
    trigger,
    handleSubmit,
  } = useFormContext<LoginFormType>();

  return (
    <S.LoginSection>
      <Heading hasA11y tags={{ h2: "Login page" }} />
      {logoIcon}
      <S.Form onSubmit={handleSubmit(handleLogin)}>
        <S.Wrapper>
          <AccountInput
            id="email"
            control={control}
            name="email"
            label="Email"
            type="text"
            hasTrim
            trigger={trigger}
            hasError={!!errors.email?.message}
          />
          <AccountInput
            id="password"
            control={control}
            name="password"
            label="Password"
            type="password"
            hasTrim
            trigger={trigger}
            hasError={!!errors.password?.message}
          />
        </S.Wrapper>
        {(errors.email?.message || errors.password?.message) && (
          <ErrorMessage
            message={
              (errors.email?.message || errors.password?.message) as string
            }
          />
        )}
        <Button
          css={S.loginButton}
          type="submit"
          label="Sign in"
          variant="primary"
          isLoading={isLoading}
          disabled={false}
          handleButtonClick={handleSubmit(handleLogin)}
        />
        {resetPasswordPath && (
          <Link css={S.resetPasswordLink} to={resetPasswordPath}>
            {defaultLanguage("Reset password")}
          </Link>
        )}
      </S.Form>
    </S.LoginSection>
  );
};

export default LoginForm;
