import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./ErrorMessage.styled";

interface ErrorMessageProps {
  className?: string;
  message: string;
}

const ErrorMessage = ({ className, message }: ErrorMessageProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.ErrorMessage className={className} role="alert">
      {defaultLanguage(message as Languages)}
    </S.ErrorMessage>
  );
};

export default ErrorMessage;
