import { defineConfig } from "vite";

import { SERVICE_INFO } from "../../packages/assets/static/serviceName";
import type { Environment } from "../../packages/types/common/env";
import { generateViteConfig } from "../../viteConfig";

export default defineConfig(({ mode }) => ({
  ...generateViteConfig({
    root: __dirname,
    serviceName: SERVICE_INFO.MOVE_RANKING.serviceName,
    port: SERVICE_INFO.MOVE_RANKING.port,
    mode: mode as Environment,
  }),
  define: {
    __SERVICE_NAME__: JSON.stringify(SERVICE_INFO.MOVE_RANKING.serviceName),
  },
}));
