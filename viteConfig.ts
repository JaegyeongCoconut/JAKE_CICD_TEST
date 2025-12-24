import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import type { UserConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

import babelConfig from "./babel.config";
import { ANSI } from "./packages/assets/static/ansi";
import { SERVICE_INFO } from "./packages/assets/static/serviceInfo";
import { CHUNK_LIST, CHUNK_PREFIX } from "./packages/assets/static/vite";
import type { Environment } from "./packages/types/common/env";
import {
  generateBuildFolderName,
  generateChunkName,
  needMsw,
  needTypia,
} from "./packages/utils/vite";
import type turbojson from "./turbo.json";

type ScriptTypes = keyof typeof turbojson.tasks;

import fs from "fs";
import path from "path";

interface GenerateViteConfigProps {
  mode: Environment;
  root: string;
  serviceInfoKey: keyof typeof SERVICE_INFO;
}

export const generateViteConfig = ({
  mode,
  root,
  serviceInfoKey,
}: GenerateViteConfigProps): UserConfig => {
  const serviceName = SERVICE_INFO[serviceInfoKey].serviceName;
  const port = SERVICE_INFO[serviceInfoKey].port;
  const buildFolderName = generateBuildFolderName({ mode, serviceName });
  const command = process.env.npm_lifecycle_event as ScriptTypes;

  console.log("🚀 실행 서비스: ", `${ANSI.BLUE}${serviceName}${ANSI.RESET}`);
  console.log("🚀 실행 명령어: ", `${ANSI.BLUE}${command}${ANSI.RESET}`);
  console.log(
    "🚀 실행 환경: ",
    `${ANSI.BLUE}${mode === "development" ? "개발" : "운영"}${ANSI.RESET}`,
  );

  return {
    // DESC: 전역 상수 설정. 런타임 환경에서 사용할 수 있는 전역 상수를 정의.
    define: {
      "import.meta.env.VITE_USE_MOCKS": needMsw(command), // DESC: Mock Service Worker(MSW) 사용 여부를 결정.
      "import.meta.env.VITE_USE_TYPIA": needTypia(command), // DESC: Typia 관련 기능 활성화 여부를 결정.
      "import.meta.env.VITE_USE_TYPIA_ALERT":
        SERVICE_INFO[serviceInfoKey].needSystemAlert,
    },

    // DESC: Plugins 관련 설정. Vite에서 사용할 플러그인들을 정의.
    plugins: [
      visualizer({
        open: true, // DESC: 번들 시각화 결과를 브라우저에서 자동으로 열지 여부.
        filename: "dist/visualizer.html", // DESC: 번들 시각화 결과 파일의 저장 경로.
        gzipSize: true, // DESC: Gzip 압축 크기를 계산하여 표시.
        brotliSize: true, // DESC: Brotli 압축 크기를 계산하여 표시.
        title: `${serviceName}-Rollup Visualizer`, // DESC: 번들 시각화 페이지의 제목.
      }),
      needTypia(command) && UnpluginTypia(), // DESC: Typia 플러그인을 조건부로 활성화.
      react({ babel: babelConfig }), // DESC: React 플러그인 활성화 및 Babel 설정 적용.
      svgr({ icon: "100%" }), // DESC: SVG를 React 컴포넌트로 변환하며, 아이콘 크기를 100%로 설정. // NOTE: 100% 로 설정하면 width 만 설정해도 height 가 자동으로 fit 하게 맞춰집니다.
      tsconfigPaths(), // DESC: tsconfig.json의 경로 별칭을 Vite에서 인식하도록 설정.
      checker({
        typescript: true, // DESC: TypeScript 타입 검사를 활성화.
        eslint: {
          useFlatConfig: true, // DESC: Flat ESLint 설정 사용 여부.
          lintCommand: "eslint './src/**/*.{ts,tsx}'", // DESC: ESLint 명령어 정의.
          dev: { logLevel: ["error"] }, // DESC: 개발 환경에서의 로그 레벨 설정.
        },
      }),
      command.includes("build") && {
        name: "remove-msw", // DESC: Mock Service Worker 파일 제거를 위한 플러그인.
        closeBundle() {
          const mswPath = path.resolve(buildFolderName, "mockServiceWorker.js"); // DESC: MSW 파일 경로 지정.
          if (fs.existsSync(mswPath)) fs.unlinkSync(mswPath); // DESC: MSW 파일이 존재하면 삭제.
        },
      },
    ],

    // DESC: 프로젝트의 루트 디렉토리 설정
    root,

    // DESC: 서버 설정
    server: {
      port, // DESC: 서버 포트 설정
      host: true, // DESC: 호스트 활성화 설정
      open: true, // DESC: 브라우저 자동 열기 설정
    },

    // DESC: 빌드 관련 설정. 빌드 출력 디렉토리 및 번들링 옵션을 정의.
    build: {
      outDir: buildFolderName, // DESC: 빌드 결과물이 저장될 디렉토리.
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // DESC: node_modules 에서 가져오는 라이브러리들은 모두 분리.
            if (id.includes("node_modules"))
              return generateChunkName({
                list: CHUNK_LIST.library,
                prefix: CHUNK_PREFIX.library,
                id,
              });

            // DESC: packages/assets 와 apps/assets 를 하나의 청크로 묶음.
            if (
              id.includes("/packages/assets/") ||
              id.includes("/apps/assets/")
            )
              return generateChunkName({
                list: CHUNK_LIST.assets,
                prefix: CHUNK_PREFIX.assets,
                id,
              });
          },
        },
      },
    },

    // DESC: 미리보기 설정. 미리보기 서버의 포트를 정의.
    preview: { port },
  };
};
