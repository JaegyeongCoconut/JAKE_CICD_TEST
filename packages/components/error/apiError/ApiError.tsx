import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { ErrorIcon } from "@repo/assets/icon";

import * as S from "./ApiError.styled";
import InternalLinkButton from "../../button/link/internalLinkButton/InternalLinkButton";

interface ApiErrorProps {
  path: string;
  errorMessage: string;
  resetErrorState: () => void;
}

const ApiError = ({ path, errorMessage, resetErrorState }: ApiErrorProps) => {
  const location = useLocation();

  useEffect(() => {
    return () => {
      resetErrorState && resetErrorState();
    };
  }, [location.pathname]);

  return (
    <S.ApiError>
      <S.Container>
        <ErrorIcon css={S.icon} />
        <S.Title>{errorMessage}</S.Title>
        <S.Desc>
          An error has occurred while processing your request.
          <br />
          Please try again later.
        </S.Desc>
        <InternalLinkButton variant="secondary" to={path}>
          Go home
        </InternalLinkButton>
      </S.Container>
    </S.ApiError>
  );
};

export default ApiError;
