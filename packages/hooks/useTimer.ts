import { useState, useEffect } from "react";

import { useTimerStore } from "@repo/stores/timer";

const useTimer = (initTime: number = 300) => {
  const isTimeStart = useTimerStore((state) => state.isTimeStart);
  const isTimeout = useTimerStore((state) => state.isTimeOut);
  const startTimer = useTimerStore((state) => state.startTimer);
  const setTimeOut = useTimerStore((state) => state.setTimeOut);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const [limitTime, setLimitTime] = useState(initTime);
  const [min, setMin] = useState(Math.floor(initTime / 60));
  const [sec, setSec] = useState(initTime % 60);

  const handleResetTimer = (): void => {
    resetTimer();
  };

  const handleStartTimer = (): void => {
    startTimer();
  };

  useEffect(() => {
    if (!isTimeStart) return;

    const interval = setInterval(() => {
      if (limitTime === 0) {
        clearInterval(interval);
      } else {
        setLimitTime(limitTime - 1);
        setMin(Math.floor((limitTime - 1) / 60));
        setSec((limitTime - 1) % 60);
        if (limitTime - 1 === 0) {
          setTimeOut(true);
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    setLimitTime(initTime);
    setMin(Math.floor(initTime / 60));
    setSec(initTime % 60);
  }, [isTimeStart]);

  useEffect(() => {
    return () => {
      setTimeOut(false);
    };
  }, []);

  return {
    isTimeout,
    limitTime,
    min,
    sec,
    resetTimer: handleResetTimer,
    startTimer: handleStartTimer,
  };
};

export default useTimer;
