import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TimerState {
  isTimeOut: boolean;
  isTimeReset: boolean;
  isTimeStart: boolean;
  onResetTimer: () => void;
  onSetTimeOut: (isOut: boolean) => void;
  onStartTimer: () => void;
}

const useTimerStore = create<TimerState>()(
  immer((set) => ({
    isTimeStart: false,
    isTimeOut: false,
    isTimeReset: false,
    onStartTimer: (): void =>
      set((state) => {
        state.isTimeStart = true;
        state.isTimeReset = false;
      }),
    onResetTimer: (): void =>
      set((state) => {
        state.isTimeStart = false;
        state.isTimeOut = false;
        state.isTimeReset = true;
      }),
    onSetTimeOut: (isOut): void =>
      set((state) => {
        state.isTimeOut = isOut;
      }),
  })),
);

export { useTimerStore };
