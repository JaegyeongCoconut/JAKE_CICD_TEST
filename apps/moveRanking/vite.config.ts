import { defineConfig } from "vite";

import type { Environment } from "@repo/types";

import { generateViteConfig } from "../../viteConfig";

export default defineConfig(({ mode }) => ({
  ...generateViteConfig({
    mode: mode as Environment,
    root: __dirname,
    serviceInfoKey: "MOVE_RANKING",
  }),
}));
