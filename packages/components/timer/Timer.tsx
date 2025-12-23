import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import useTimer from "@repo/hooks/useTimer";

import * as S from "./Timer.styled";

interface TimerProps {
  className?: string;
  initTime: number;
}

const Timer = ({ className, initTime }: TimerProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { limitTime, min, sec } = useTimer(initTime);

  const addZeroFirstString = (num: number): string | number | undefined => {
    if (num === undefined) return;

    return (num + "").length === 1 ? `0${num}` : num;
  };

  return (
    <S.Time className={className} isTimeOver={limitTime <= 60}>
      {defaultLanguage({ text: LANGUAGE_LABEL.EXPIRES_IN })}{" "}
      {addZeroFirstString(min)}:{addZeroFirstString(sec)}
    </S.Time>
  );
};

export default Timer;
