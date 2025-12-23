import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    clearMocks: true, // DESC: 실행 후 mock 호출을 초기화
    include: ["packages/**/?(*.)+(test|spec).?(c|m)[tj]s?(x)"],
    exclude: [
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.husky/**",
      "**/.storybook/**",
      "tasks/**",
      "**/build/**",
    ],
    environment: "jsdom", // DESC: 테스트 환경 설정
    globals: true, // DESC: 전역 API 사용 여부
    setupFiles: ["./packages/test/setup.ts"], // DESC: 테스트를 실행하기 전에 실행할 파일 지정
    /* DESC: 
        provider: V8 엔진 내장 기능을 사용
        reporter: 커버리지 보고서 형식
            'text': 터미널에 텍스트로 요약 출력
            'html': HTML 파일로 자세한 보고서 생성
            'lcov': CI/CD 시스템과 통합하기 위한 포맷
        reportsDirectory: 커버리지 보고서를 저장할 디렉토리 경로
        exclude: 커버리지 측정에서 제외할 파일 패턴
    */
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: ["**/*.d.ts", "**/*.stories.*", "**/stories/**"],
    },
  },
});
