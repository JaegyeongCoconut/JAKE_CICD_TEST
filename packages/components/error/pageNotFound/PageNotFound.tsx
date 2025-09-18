import React from "react";

import { ReactComponent as WarningIcon } from "@repo/assets/icon/ic_warning.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import * as S from "./PageNotFound.styled";
import InternalLinkButton from "../../button/link/internalLinkButton/InternalLinkButton";

interface PageNotFoundProps {
  path: string;
}

const PageNotFound = ({ path }: PageNotFoundProps) => {
  return (
    <S.PageNotFound>
      <S.Container>
        <WarningIcon css={S.icon} />
        <S.Title>Page not found</S.Title>
        <S.Desc>
          The requested page could not be found. <br />
          Please check that the address on the page you entered is correct
        </S.Desc>
        <InternalLinkButton
          variant="secondary"
          hasBoth={false}
          label={LANGUAGE_LABEL.GO_HOME}
          to={path}
        />
      </S.Container>
    </S.PageNotFound>
  );
};

export default PageNotFound;
