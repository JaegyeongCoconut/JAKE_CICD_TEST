import React from "react";

import { ThemeProvider } from "@emotion/react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { theme } from "@packages/styles/themes";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

interface RenderComponentProps {
  options?: Omit<RenderOptions, "wrapper">;
  ui: React.ReactElement;
}

const renderComponent = ({ ui, options }: RenderComponentProps) => {
  return render(ui, { wrapper: Providers, ...options });
};

export default renderComponent;
