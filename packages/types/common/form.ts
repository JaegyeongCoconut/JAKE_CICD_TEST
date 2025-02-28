import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static";

import type { AppVersion } from "./version";

export interface FormVersion
  extends Omit<AppVersion, "serviceName" | "to" | "os"> {
  os: keyof typeof VERSION_OS;
  platform: keyof typeof VERSION_PLATFORM;
}
