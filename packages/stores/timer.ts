import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TimerState {
  isTimeStart: boolean;
  isTimeOut: boolean;
  isTimeReset: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setTimeOut: (isOut: boolean) => void;
}

const useTimerStore = create<TimerState>()(
  immer((set) => ({
    isTimeStart: false,
    isTimeOut: false,
    isTimeReset: false,
    startTimer: (): void =>
      set((state) => {
        state.isTimeStart = true;
        state.isTimeReset = false;
      }),
    stopTimer: (): void =>
      set((state) => {
        state.isTimeStart = false;
      }),
    resetTimer: (): void =>
      set((state) => {
        state.isTimeStart = false;
        state.isTimeOut = false;
        state.isTimeReset = true;
      }),
    setTimeOut: (isOut): void =>
      set((state) => {
        state.isTimeOut = isOut;
      }),
  })),
);

export { useTimerStore };
