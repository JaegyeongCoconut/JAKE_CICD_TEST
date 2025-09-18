import React from "react";

import { useTranslation } from "react-i18next";

import DisabledButton from "@repo/components/button/disabled";
import InternalLinkButton from "@repo/components/button/link/internal";

import { LANGUAGE_LABEL, PATH } from "~constants";

import * as S from "./Layer.styled";
import FormSkeleton from "./containers/form/Form.skeleton";

const LayerSkeleton = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormSkeleton />
      <S.HorizontalLine />
      <S.ButtonWrapper>
        <DisabledButton
          variant="primary"
          label={LANGUAGE_LABEL.START_INSPECTION}
        />
        <InternalLinkButton
          variant="secondary"
          hasBoth={false}
          label={t(LANGUAGE_LABEL.CANCEL)}
          to={`/${PATH.INSPECTION}`}
        />
      </S.ButtonWrapper>
    </>
  );
};

export default LayerSkeleton;
