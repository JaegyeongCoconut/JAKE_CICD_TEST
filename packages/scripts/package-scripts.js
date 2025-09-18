import { ANSI } from "../assets/static/ansi.js";

import { exec } from "child_process";

const runScript = (script) => {
  return new Promise((resolve, reject) => {
    console.log(`Running script: ${script}`);
    exec(script, (error, stdout) => {
      if (error) {
        console.error(`Error running script: ${script}`);
        return reject(error);
      }
      console.log(stdout); // NOTE: scripts 에 있는 console.log cli 에 출력
      resolve();
    });
  });
};

const scripts = [
  "node ../../packages/scripts/create-robots.js",
  "node src/scripts/check-env-values.js",
];

Promise.all(scripts.map(runScript))
  .then(() => {
    console.log(`🚀 ${ANSI.GREEN}스크립트 실행이 성공했습니다.${ANSI.RESET}`);
  })
  .catch((error) => {
    console.error(
      `❌ ${ANSI.RED}스크립트 실행이 실패했습니다.${ANSI.RESET}`,
      error,
    );
    process.exit(1);
  });
