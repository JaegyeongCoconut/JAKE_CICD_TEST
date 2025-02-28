// NOTE: check-env-values.js 와 같이 관리해야 함
declare namespace NodeJS {
  export interface ProcessEnv {
    VITE_BASE_URL: string;
    VITE_TITLE_PREFIX: "dev-" | "";
  }
}
