import React from "react";

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
        label="Reset"
        isLoading={false}
        disabled={false}
        handleButtonClick={calendar.handleReset}
      />
      <Button
        css={S.applyButton}
        variant="primary"
        label="Apply"
        isLoading={false}
        disabled={calendar.isDisabledApplyButton}
        handleButtonClick={calendar.handleApply}
      />
    </S.ButtonWrapper>
  );
};

export default CalendarButtons;
