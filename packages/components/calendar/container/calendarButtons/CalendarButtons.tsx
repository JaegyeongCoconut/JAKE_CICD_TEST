import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { FormatCalendar } from "@repo/types";

import * as S from "./CalendarButtons.styled";
import Button from "../../../button/Button";

interface CalendarButtonsProps {
  calendar: FormatCalendar["calendarButtons"];
}

const CalendarButtons = ({ calendar }: CalendarButtonsProps) => {
  return (
    <S.ButtonWrapper>
      <Button
        css={S.resetButton}
        variant="secondary"
        disabled={false}
        isLoading={false}
        label={LANGUAGE_LABEL.RESET}
        handleButtonClick={calendar.handleReset}
      />
      <Button
        css={S.applyButton}
        variant="primary"
        disabled={calendar.isDisabledApplyButton}
        isLoading={false}
        label={LANGUAGE_LABEL.APPLY}
        handleButtonClick={calendar.handleApply}
      />
    </S.ButtonWrapper>
  );
};

export default CalendarButtons;
