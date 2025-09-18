import type { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import type { CHUNK_PREFIX } from "@repo/assets/static/vite";
import type { Environment, ValueOf } from "@repo/types";

import type turbojson from "../../turbo.json";

type ScriptTypes = keyof typeof turbojson.tasks;

export const needMsw = (command: ScriptTypes): boolean =>
  command.includes("mock") ? true : false;

export const needTypia = (command: ScriptTypes): boolean =>
  command.includes("typia") || command.includes("build") ? true : false;

interface GenerateBuildFolderNameProps {
  mode: Environment;
  serviceName: (typeof SERVICE_INFO)[keyof typeof SERVICE_INFO]["serviceName"];
}
export const generateBuildFolderName = ({
  mode,
  serviceName,
}: GenerateBuildFolderNameProps): string => {
  const env = mode === "development" ? "dev" : "prod";

  return `build-${env}-${serviceName}`;
};

interface GenerateChunkNameProps {
  id: string;
  list: string[];
  prefix: ValueOf<typeof CHUNK_PREFIX>;
}
export const generateChunkName = ({
  list,
  prefix,
  id,
}: GenerateChunkNameProps): string | undefined => {
  const chunkName = list.find((name) => id.includes(name));

  if (chunkName) {
    return `${prefix}-${chunkName}`;
  }
  return undefined;
};
