import React from "react";

import ReactDOM from "react-dom/client";

import { initI18n } from "@repo/utils/i18n";

import { resources } from "~assets";

import App from "./App";

initI18n({ initLanguage: "lo", resources });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
