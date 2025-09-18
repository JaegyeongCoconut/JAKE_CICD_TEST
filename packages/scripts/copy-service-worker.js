import { ANSI } from "../assets/static/ansi.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_PATH = path.resolve(__dirname, "../../");

const DEFAULT_SERVICE_WOKRER = path.join(
  ROOT_PATH,
  "packages/mocks/mockServiceWorker.js",
);

export const copyServiceWorker = (serviceName) => {
  const DESTINATE_PATH = path.join(
    ROOT_PATH,
    `apps/${serviceName}`,
    "public",
    "mockServiceWorker.js",
  );

  fs.copyFileSync(DEFAULT_SERVICE_WOKRER, DESTINATE_PATH);

  console.log(
    `🚀 ${ANSI.BLUE}${serviceName}/public${ANSI.RESET}에 ${ANSI.GREEN}mockServiceWorker${ANSI.RESET}가 추가되었습니다.`,
  );
};
