import { useEffect } from "react";

import useResetSystemState from "@repo/hooks/useResetSystemState";

interface AuthProps<T> {
  hasClearCountryCode: boolean;
  hasTranslation: boolean;
  initializeAuth: () => void;
  user: T | null;
}

const Auth = <T,>({
  hasClearCountryCode,
  hasTranslation,
  initializeAuth,
  user,
}: AuthProps<T>) => {
  const { resetSystemState } = useResetSystemState({
    hasClearCountryCode,
    hasTranslation,
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      resetSystemState();
    }
  }, [user]);

  return null;
};

export default Auth;
