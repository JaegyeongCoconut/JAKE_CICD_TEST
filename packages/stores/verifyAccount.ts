import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface VerifyAccountInfo {
  email: string;
  authCode: string;
  isEmailVerifyDone: boolean;
}

export const initVerifyAccountInfo = {
  email: "",
  authCode: "",
  isEmailVerifyDone: false,
};

interface VerifyAccountState {
  verifyInfo: VerifyAccountInfo;
  setEmail: (email: string) => void;
  setAuthCode: (code: string) => void;
  setEmailVerifyDone: (isDone: boolean) => void;
  resetVerifyInfo: () => void;
}

const useVerifyAccountStore = create<VerifyAccountState>()(
  immer((set) => ({
    verifyInfo: initVerifyAccountInfo,
    setEmail: (email): void =>
      set((state) => {
        state.verifyInfo.email = email;
      }),
    setAuthCode: (code): void =>
      set((state) => {
        state.verifyInfo.authCode = code;
      }),
    setEmailVerifyDone: (isDone): void =>
      set((state) => {
        state.verifyInfo.isEmailVerifyDone = isDone;
      }),
    resetVerifyInfo: (): void =>
      set((state) => {
        state.verifyInfo = initVerifyAccountInfo;
      }),
  })),
);

export { useVerifyAccountStore };
