import type { JSX } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import useResetSystemState from "@repo/hooks/useResetSystemState";

import type { LoginServerModel } from "~types";
import { CarInspectionAuth } from "~utils";

export const auth = CarInspectionAuth.getInstance();

export const AuthContext = createContext<
  | {
      auth: CarInspectionAuth;
      error: { message: string } | null;
      initializing: boolean;
      user: LoginServerModel | null;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { i18n } = useTranslation();

  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [user, setUser] = useState<LoginServerModel | null>(null);

  const { resetSystemState } = useResetSystemState({
    hasSetUser: true,
    hasClearCountryCode: true,
    hasTranslation: true,
    onSetUser: setUser,
  });

  const value = { user, error, auth, initializing };

  useEffect(() => {
    auth
      .resolveUser()
      .onAuthStateChanged((user: LoginServerModel | null, error) => {
        if (user) {
          setUser(user);
          setError(null);
        } else {
          resetSystemState();
          if (error) {
            setError(error);
          }
        }
        setInitializing(false);
      });
    i18n.changeLanguage("lo");
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
