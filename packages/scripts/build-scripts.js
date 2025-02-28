import { exec } from "child_process";

const runScript = (script) => {
  return new Promise((resolve, reject) => {
    console.log(`Running script: ${script}`);
    exec(script, { stdio: "inherit" }, (error, stdout) => {
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
  "node ../../packages/scripts/language-converter.js",
  "node ../../packages/scripts/create-robots.js",
  "node src/scripts/check-env-values.js",
];

Promise.all(scripts.map(runScript))
  .then(() => {
    console.log("🚀 \x1b[32m스크립트 실행이 성공했습니다.\x1b[0m");
  })
  .catch((error) => {
    console.error("❌ \x1b[31m스크립트 실행이 실패했습니다.\x1b[0m", error);
    process.exit(1);
  });
