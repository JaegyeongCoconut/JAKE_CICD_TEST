import React from "react";

import { useTranslation } from "react-i18next";

import InternalLinkButton from "@repo/components/button/link/internal";

import { GreenCheckIcon } from "~assets";
import { Header } from "~components";
import { LANGUAGE_LABEL, PATH } from "~constants";

import * as S from "./Completed.styled";

const Completed = () => {
  const { t } = useTranslation();

  return (
    <S.Section>
      <Header>
        <Header.Title title={LANGUAGE_LABEL.CAR_INSPECTION} />
      </Header>
      <S.Wrapper>
        <GreenCheckIcon css={S.icon} />
        <S.Title hasMaginBottom>
          {t(LANGUAGE_LABEL.INSPECTION_COMPLETED_SUCCESSFULLY)}
        </S.Title>
        <div>
          <InternalLinkButton
            variant="primary"
            hasBoth={false}
            label={t(LANGUAGE_LABEL.BACK_TO_INSPECTION_RESULT)}
            to={`/${PATH.INSPECTION}`}
          />
        </div>
      </S.Wrapper>
    </S.Section>
  );
};

export default Completed;
