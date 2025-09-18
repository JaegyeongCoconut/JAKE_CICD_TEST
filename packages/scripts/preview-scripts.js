import concurrently from "concurrently";

import { ANSI } from "../assets/static/ansi.js";
import { SERVICE_INFO } from "../assets/static/serviceInfo.js";

import { execSync } from "child_process";

const runScript = (command) => {
  execSync(command, { stdio: "inherit" });
};

const runConcurrently = (tasks) => {
  concurrently(tasks, { prefix: "none", restartTries: 3 })
    .result.then()
    .catch((error) => {
      console.error(
        `❌ ${ANSI.RED}스크립트 실행이 실패하였습니다.${ANSI.RESET}`,
        error,
      );
    });
};

const createTasks = (command, serviceNames) =>
  serviceNames.map((serviceName) => ({
    command: `cd apps/${serviceName} && pnpm run ${command}`,
    name: `${command}-${serviceName}`,
  }));

const packageRun = () => {
  let [command, serviceName] = process.env.npm_lifecycle_event.split(":");

  const isSingleService = !!serviceName;

  if (isSingleService) {
    const scriptCommand = `cd apps/${serviceName} && pnpm run ${command}`;

    runScript(scriptCommand);
  } else {
    const serviceNames = Object.values(SERVICE_INFO).map(
      (service) => service.serviceName,
    );

    const tasks = createTasks(command, serviceNames);
    console.log(`🚀 ${ANSI.GREEN}모든 서비스가 실행되었습니다.${ANSI.RESET}`);
    runConcurrently(tasks);
  }
};

packageRun();
