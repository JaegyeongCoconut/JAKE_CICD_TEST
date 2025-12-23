import type { ChangeEvent } from "react";
import React from "react";

import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { LoginFormSchema } from "@repo/schemas/loginForm.schema";

import * as S from "./LoginForm.styled";
import Button from "../../button/Button";
import Heading from "../../heading/Heading";
import AccountInput from "../../input/accountInput/AccountInput";
import ErrorMessage from "../../message/ErrorMessage";

interface LoginFormProps {
  className?: string;
  isLoading: boolean;
  logoIcon: React.ReactNode;
  resetPasswordPath: string | null;
  handleLogin: (data: LoginFormSchema) => void;
}

const LoginForm = ({
  className,
  logoIcon,
  resetPasswordPath,
  handleLogin,
  isLoading,
}: LoginFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    formState: { errors, dirtyFields },
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useFormContext<LoginFormSchema>();

  return (
    <S.LoginSection>
      <Heading hasA11y tags={{ h2: "Login page" }} />
      {logoIcon}
      <S.Form className={className} onSubmit={handleSubmit(handleLogin)}>
        <S.Wrapper>
          <AccountInput
            id="email"
            disabled={false}
            hasError={!!errors.email?.message}
            isDirty={!!dirtyFields.email}
            label={LANGUAGE_LABEL.EMAIL}
            maxLength={100}
            type="email"
            register={register("email", {
              onChange: (e: ChangeEvent<HTMLInputElement>): void =>
                setValue("email", e.target.value.trim()),
            })}
          />
          <AccountInput
            id="password"
            disabled={false}
            hasError={!!errors.password?.message}
            isDirty={!!dirtyFields.password}
            label={LANGUAGE_LABEL.PASSWORD}
            maxLength={100}
            type="password"
            register={register("password", {
              onChange: (e: ChangeEvent<HTMLInputElement>): void => {
                setValue("password", e.target.value.trim());
                trigger("email");
              },
            })}
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
          variant="primary"
          disabled={false}
          isLoading={isLoading}
          label={LANGUAGE_LABEL.SIGN_IN}
          type="submit"
          handleButtonClick={handleSubmit(handleLogin)}
        />
        {resetPasswordPath && (
          <Link css={S.resetPasswordLink} to={resetPasswordPath}>
            {defaultLanguage({ text: LANGUAGE_LABEL.RESET_PASSWORD })}
          </Link>
        )}
      </S.Form>
    </S.LoginSection>
  );
};

export default LoginForm;
