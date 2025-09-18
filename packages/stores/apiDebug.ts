import type { IValidation } from "typia";
import { create } from "zustand";

type ApiLogsType = Record<string, IValidation.IError[]>;

interface SetLogProps {
  errors: IValidation.IError[];
  path: string;
}

interface ApiDebugProps {
  isOpen: boolean;
  logs: ApiLogsType;
  onAllClear: () => void;
  onClearLog: (path: string) => void;
  onGetHasError: () => boolean;
  onSetLog: ({ path, errors }: SetLogProps) => void;
  onToggle: () => void;
}

export const apiDebug = create<ApiDebugProps>((set, get) => ({
  logs: {},
  onAllClear: () => set({ logs: {}, isOpen: false }),
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onGetHasError: () => Object.keys(get().logs).length > 0,
  onClearLog: (path) => {
    const newLogs: ApiLogsType = { ...get().logs };

    delete newLogs[path];

    set({ logs: newLogs });
  },
  onSetLog: ({ path, errors }: SetLogProps) => {
    set((state) => ({ logs: { ...state.logs, [path]: errors } }));
  },
}));

export const useApiDebugStore = apiDebug;
