import React from "react";

import { Global, ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setAutoFreeze } from "immer";
import { RouterProvider } from "react-router-dom";

import Toast from "@repo/components/toast";
import Auth from "@repo/contexts/Auth";
import { queryClient } from "@repo/services/queryClient";
import { deleteConsole } from "@repo/settings/deleteConsole";
import globalStyles from "@repo/styles/globalStyles";
import { theme } from "@repo/styles/themes";

import router from "~router";
import { useAuthStore } from "~stores";

const App = () => {
  const user = useAuthStore((state) => state.user);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  setAutoFreeze(false);

  deleteConsole();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Auth
        hasClearCountryCode
        hasTranslation
        initializeAuth={initializeAuth}
        user={user}
      />
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Toast />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
