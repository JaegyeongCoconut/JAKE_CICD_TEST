import Cookies from "js-cookie";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { SERVICE_INFO } from "@repo/assets/static/serviceInfo";

interface AuthStoreType<TUser> {
  changeAccessToken: (accessToken: string) => void;
  changeUserData: (partialData: Partial<TUser>) => void;
  initializeAuth: () => void;
  signIn: (data: TUser) => void;
  signOut: () => void;
  user: TUser | null;
}

interface CreateAuthStoreProps {
  cookieKey: (typeof SERVICE_INFO)[keyof typeof SERVICE_INFO]["cookieKey"];
}

const createAuthStore = <
  TUser extends { accessToken: string; refreshToken: string },
>({
  cookieKey,
}: CreateAuthStoreProps) => {
  const readCookie = (): TUser | null => {
    if (typeof window === "undefined") return null;

    const savedUser = Cookies.get(cookieKey);

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as TUser;
    } catch {
      return null;
    }
  };

  const writeCookie = (data: TUser): void => {
    Cookies.set(cookieKey, JSON.stringify(data));
  };

  return create<AuthStoreType<TUser>>()(
    immer((set, get) => ({
      user: readCookie(),
      signIn: (data): void => {
        writeCookie(data);
        set({ user: data });
      },
      signOut: (): void => {
        Cookies.remove(cookieKey);
        set({ user: null });
      },
      changeUserData: (partial): void => {
        const currentUser = get().user;

        if (!currentUser) return;

        const updatedUser = { ...currentUser, ...partial };
        writeCookie(updatedUser);
        set({ user: updatedUser });
      },
      changeAccessToken: (accessToken): void => {
        const partial = { accessToken } as Partial<TUser>;
        get().changeUserData(partial);
      },
      initializeAuth: (): void => {
        if (typeof window === "undefined") return;

        const savedUser = readCookie();
        set({ user: savedUser });
      },
    })),
  );
};

export default createAuthStore;
