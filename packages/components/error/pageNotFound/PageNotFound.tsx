import React from "react";

import { ErrorIcon } from "@repo/assets/icon";

import * as S from "./PageNotFound.styled";
import InternalLinkButton from "../../button/link/internalLinkButton/InternalLinkButton";

interface PageNotFoundProps {
  path: string;
}

const PageNotFound = ({ path }: PageNotFoundProps) => {
  return (
    <S.PageNotFound>
      <S.Container>
        <ErrorIcon css={S.icon} />
        <S.Title>Page not found</S.Title>
        <S.Desc>
          The requested page could not be found. <br />
          Please check that the address on the page you entered is correct
        </S.Desc>
        <InternalLinkButton variant="secondary" to={path}>
          Go home
        </InternalLinkButton>
      </S.Container>
    </S.PageNotFound>
  );
};

export default PageNotFound;
