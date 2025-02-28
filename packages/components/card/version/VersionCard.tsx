import React from "react";

import { Link } from "react-router-dom";

import { ChevronDownIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { AppVersion } from "@repo/types";

import * as S from "./VersionCard.styled";

interface VersionCardProps {
  version: AppVersion;
}

const VersionCard = ({ version }: VersionCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{`${version.serviceName} (${version.os})`}</S.Title>
        <Link css={S.link} to={version.to}>
          <span>{defaultLanguage("Edit")}</span>
          <ChevronDownIcon css={S.icon} />
        </Link>
      </S.Header>
      <S.Body>
        <S.Item>
          <S.Name>{defaultLanguage("First version")}</S.Name>
          <S.VersionContent>{version.old}</S.VersionContent>
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage("Last version")}</S.Name>
          <S.VersionContent>{version.new}</S.VersionContent>
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage("Review version")}</S.Name>
          <S.VersionContent>{version.test}</S.VersionContent>
        </S.Item>
      </S.Body>
    </S.Wrapper>
  );
};

export default VersionCard;
