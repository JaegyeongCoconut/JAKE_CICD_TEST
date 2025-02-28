import concurrently from "concurrently";

import { createI18nextDeclare } from "./create-i18next-declare.js";
import { SERVICE_INFO } from "../assets/static/serviceName.js";

import { execSync } from "child_process";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runScript = (command) => {
  execSync(command, { stdio: "inherit" });
};

const runConcurrently = (tasks) => {
  concurrently(tasks, { prefix: "none", restartTries: 3 })
    .result.then()
    .catch((error) => {
      console.error("❌ \x1b[31m스크립트 실행이 실패하였습니다.\x1b[0m", error);
    });
};

const getServices = () => {
  const packagesDir = path.join(__dirname, "../../", "apps");

  return fs
    .readdirSync(packagesDir)
    .filter((file) => file !== "common" && file !== ".DS_Store");
};

const createTasks = (command, services) =>
  services.map((service) => ({
    command: `cd apps/${service} && pnpm run ${command}`,
    name: `${command}-${service}`,
  }));

const packageRun = () => {
  const argv = process.env.npm_lifecycle_event;
  let [command, scriptServiceName] = argv.split(":");

  command = command.replace(/-i18n$/, "");

  if (scriptServiceName) {
    const serviceInfo = Object.values(SERVICE_INFO).find(
      (service) => service.serviceName === scriptServiceName,
    );

    const scriptCommand = command.includes("preview")
      ? `cd apps/${scriptServiceName} && pnpm run ${command}`
      : `turbo ${command} --filter=${serviceInfo.packageName}`;
    createI18nextDeclare(serviceInfo);
    runScript(scriptCommand);
  } else {
    if (command.includes("preview")) {
      const services = getServices();
      const tasks = createTasks(command, services);
      console.log("🚀 \x1b[32m모든 서비스가 실행되었습니다.\x1b[0m");
      runConcurrently(tasks);
    } else {
      if (command.includes("dev")) {
        Object.values(SERVICE_INFO).forEach((serviceInfo) => {
          createI18nextDeclare(serviceInfo);
        });
      }
      runScript(`turbo ${command}`);
    }
  }
};

packageRun();
