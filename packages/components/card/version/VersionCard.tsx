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

  const versions = [
    { name: LANGUAGE_LABEL.FIRST_VERSION, versionContent: version?.old },
    { name: LANGUAGE_LABEL.LAST_VERSION, versionContent: version?.new },
    { name: LANGUAGE_LABEL.REVIEW_VERSION, versionContent: version?.test },
  ];

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{`${version?.serviceName ?? "-"} (${version?.os ?? "-"})`}</S.Title>
        {version?.to && (
          <Link css={S.link} to={version.to}>
            <span>{defaultLanguage({ text: LANGUAGE_LABEL.EDIT })}</span>
            <DownIcon css={S.icon} />
          </Link>
        )}
      </S.Header>
      <S.Body>
        {versions.map(({ name, versionContent }) => (
          <S.Item key={name}>
            <S.Name>{defaultLanguage({ text: name })}</S.Name>
            <S.VersionContent>{versionContent || "-"}</S.VersionContent>
          </S.Item>
        ))}
      </S.Body>
    </S.Wrapper>
  );
};

export default VersionCard;
