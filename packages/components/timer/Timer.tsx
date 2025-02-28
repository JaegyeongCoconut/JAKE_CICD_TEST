import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useTimer from "@repo/hooks/useTimer";
import { addZeroFirstString } from "@repo/utils/date";

import * as S from "./Timer.styled";

interface TimerProps {
  className?: string;
  initTime?: number;
}

const Timer = ({ className, initTime }: TimerProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { limitTime, min, sec } = useTimer(initTime);

  return (
    <S.Time className={className} isTimeOver={limitTime <= 60}>
      {defaultLanguage("Expiration time")} {addZeroFirstString(min)}:
      {addZeroFirstString(sec)}
    </S.Time>
  );
};

export default Timer;
