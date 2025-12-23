import React from "react";

import InternalLinkButton from "@repo/components/button/link/internal";

import { GreenCheckIcon } from "~assets";
import { Header } from "~components";
import { LANGUAGE_LABEL, PATH } from "~constants";
import { useServiceTranslation } from "~hooks";

import * as S from "./Completed.styled";

const Completed = () => {
  const { defaultLanguage } = useServiceTranslation();

  return (
    <S.Section>
      <Header>
        <Header.Title title={LANGUAGE_LABEL.CAR_INSPECTION} />
      </Header>
      <S.Wrapper>
        <GreenCheckIcon css={S.icon} />
        <S.Title hasMaginBottom>
          {defaultLanguage({
            text: LANGUAGE_LABEL.INSPECTION_COMPLETED_SUCCESSFULLY,
          })}
        </S.Title>
        <div>
          <InternalLinkButton
            variant="primary"
            hasBoth={false}
            label={defaultLanguage({
              text: LANGUAGE_LABEL.BACK_TO_INSPECTION_RESULT,
            })}
            to={`/${PATH.INSPECTION}`}
          />
        </div>
      </S.Wrapper>
    </S.Section>
  );
};

export default Completed;
