import { useState, useEffect } from "react";

import { useTimerStore } from "@repo/stores/timer";

const useTimer = (initTime: number) => {
  const isTimeStart = useTimerStore((state) => state.isTimeStart);
  const isTimeout = useTimerStore((state) => state.isTimeOut);
  const startTimer = useTimerStore((state) => state.onStartTimer);
  const setTimeOut = useTimerStore((state) => state.onSetTimeOut);
  const resetTimer = useTimerStore((state) => state.onResetTimer);

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
      setLimitTime((prev) => {
        const next = prev - 1;

        if (next <= 0) {
          setMin(0);
          setSec(0);
          setTimeOut(true);
          clearInterval(interval);

          return 0;
        }

        setMin(Math.floor(next / 60));
        setSec(next % 60);

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimeStart]);

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
    isTimeStart,
    limitTime,
    min,
    sec,
    resetTimer: handleResetTimer,
    startTimer: handleStartTimer,
  };
};

export default useTimer;
