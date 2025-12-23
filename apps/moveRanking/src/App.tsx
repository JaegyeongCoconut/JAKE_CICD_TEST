import React from "react";

import { Global, ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setAutoFreeze } from "immer";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@repo/services/queryClient";
import { deleteConsole } from "@repo/settings/deleteConsole";
import globalStyles from "@repo/styles/globalStyles";
import { theme } from "@repo/styles/themes";

import router from "~router";

const App = () => {
  setAutoFreeze(false);

  deleteConsole();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
