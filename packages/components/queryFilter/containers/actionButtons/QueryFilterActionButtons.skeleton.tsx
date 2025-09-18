import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import * as S from "./QueryFilterActionButtons.styled";
import Button from "../../../button/Button";

const QueryFilterActionButtonsSkeleton = () => {
  return (
    <S.QueryFilterActionButtonsWrapper>
      <Button
        variant="secondary"
        disabled
        isLoading={false}
        label={LANGUAGE_LABEL.RESET}
        handleButtonClick={() => {}}
      />
      <Button
        variant="primary"
        disabled
        isLoading={false}
        label={LANGUAGE_LABEL.APPLY}
        handleButtonClick={() => {}}
      />
    </S.QueryFilterActionButtonsWrapper>
  );
};

export default QueryFilterActionButtonsSkeleton;
