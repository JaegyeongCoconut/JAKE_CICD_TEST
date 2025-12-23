import { copyServiceWorker } from "./copy-service-worker.js";
import { SERVICE_INFO } from "../assets/static/serviceInfo.js";

import { execSync } from "child_process";

const runScript = (command) => {
  execSync(command, { stdio: "inherit" });
};

const packageRun = () => {
  let [command, serviceName] = process.env.npm_lifecycle_event.split(":");

  const isSingleService = !!serviceName;

  if (isSingleService) {
    const serviceInfo = Object.values(SERVICE_INFO).find(
      (service) => service.serviceName === serviceName,
    );

    const scriptCommand = `turbo ${command} --filter=${serviceInfo.packageName}`;

    if (command.includes("mock")) {
      copyServiceWorker(serviceName);
    }

    runScript(scriptCommand);
  } else {
    runScript(`turbo ${command}`);
  }
};

packageRun();
