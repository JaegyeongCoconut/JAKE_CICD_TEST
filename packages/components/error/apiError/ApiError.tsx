import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import * as S from "./ApiError.styled";
import InternalLinkButton from "../../button/link/internalLinkButton/InternalLinkButton";

interface ApiErrorProps {
  errorMessage: string;
  path: string;
  onResetErrorState: () => void;
}

const ApiError = ({ path, errorMessage, onResetErrorState }: ApiErrorProps) => {
  const location = useLocation();

  useEffect(() => {
    return () => {
      onResetErrorState && onResetErrorState();
    };
  }, [location.pathname]);

  return (
    <S.ApiError>
      <S.Container>
        <WarningIcon css={S.icon} />
        <S.Title>{errorMessage}</S.Title>
        <S.Desc>
          An error has occurred while processing your request.
          <br />
          Please try again later.
        </S.Desc>
        <InternalLinkButton
          variant="secondary"
          hasBoth={false}
          label={LANGUAGE_LABEL.GO_HOME}
          to={path}
        />
      </S.Container>
    </S.ApiError>
  );
};

export default ApiError;
