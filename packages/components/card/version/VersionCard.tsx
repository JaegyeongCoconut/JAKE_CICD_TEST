import React from "react";

import { Link } from "react-router-dom";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { AppVersion, RecursiveUndefined } from "@repo/types";

import * as S from "./VersionCard.styled";

interface VersionCardProps {
  version: RecursiveUndefined<AppVersion>;
}

const VersionCard = ({ version }: VersionCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{`${version?.serviceName} (${version?.os})`}</S.Title>
        {version?.to && (
          <Link css={S.link} to={version.to}>
            <span>{defaultLanguage(LANGUAGE_LABEL.EDIT)}</span>
            <DownIcon css={S.icon} />
          </Link>
        )}
      </S.Header>
      <S.Body>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.FIRST_VERSION)}</S.Name>
          <S.VersionContent>{version?.old}</S.VersionContent>
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.LAST_VERSION)}</S.Name>
          <S.VersionContent>{version?.new}</S.VersionContent>
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.REVIEW_VERSION)}</S.Name>
          <S.VersionContent>{version?.test}</S.VersionContent>
        </S.Item>
      </S.Body>
    </S.Wrapper>
  );
};

export default VersionCard;
