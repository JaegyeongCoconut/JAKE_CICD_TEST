import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import babelConfig from "./babel.config";

interface GenerateCommonViteConfigProps {
  root: string;
  serviceName: string;
  port: number;
  mode: "development" | "production";
}

export const generateViteConfig = ({
  root,
  serviceName,
  port,
  mode,
}: GenerateCommonViteConfigProps): {
  plugins: any[];
  base: "./build";
  root: string;
  server: { port: number; host: boolean; open: boolean };
  build: { cacheDir: string; outDir: string };
  preview: { port: number; outDir: string };
} => {
  const generateBuildFolderName = (): string => {
    const env = mode === "development" ? "dev" : "prod";

    return `build-${env}-${serviceName}`;
  };

  const buildFolderName = generateBuildFolderName();

  const argv = process.env.npm_lifecycle_event!;
  const [command] = argv.split(":");

  console.log("🚀 실행 서비스: ", `\x1b[34m${serviceName}\x1b[0m`);
  console.log("🚀 실행 명령어: ", `\x1b[34m${command}\x1b[0m`);
  console.log(
    "🚀 실행 환경: ",
    `\x1b[34m${mode === "development" ? "개발" : "운영"}\x1b[0m`,
  );

  return {
    plugins: [
      react({ babel: babelConfig }),
      svgr({ icon: "100%" }), // NOTE: 100% 로 설정하면 width 만 설정해도 height 가 자동으로 fit 하게 맞춰집니다.
      tsconfigPaths(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: "eslint './src/**/*.{ts,tsx}'",
          dev: { logLevel: ["error"] },
        },
      }),
    ],
    base: "./build",
    root,
    server: { port, host: true, open: true },
    build: { cacheDir: ".vite/build", outDir: buildFolderName },
    preview: { port, outDir: buildFolderName },
  };
};
