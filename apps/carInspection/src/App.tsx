import React from "react";

import { Global, ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setAutoFreeze } from "immer";

import { queryClient } from "@repo/services/queryClient";
import globalStyles from "@repo/styles/globalStyles";
import { theme } from "@repo/styles/themes";
import { deleteConsole } from "@repo/utils/deleteConsole";

import { Root } from "~components";

const App = () => {
  setAutoFreeze(false);

  deleteConsole();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Root />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
