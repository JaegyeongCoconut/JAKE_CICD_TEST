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
  onAllClear: (): void => set({ logs: {}, isOpen: false }),
  isOpen: false,
  onToggle: (): void => set((state) => ({ isOpen: !state.isOpen })),
  onGetHasError: (): boolean => !!Object.keys(get().logs).length,
  onClearLog: (path): void => {
    const newLogs: ApiLogsType = { ...get().logs };

    delete newLogs[path];

    set({ logs: newLogs });
  },
  onSetLog: ({ path, errors }: SetLogProps): void => {
    set((state) => ({ logs: { ...state.logs, [path]: errors } }));
  },
}));

export const useApiDebugStore = apiDebug;
