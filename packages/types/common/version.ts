import type { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";

import type { ValueOf } from "./method";

export interface AppVersion {
  new: string;
  old: string;
  os: ValueOf<typeof VERSION_OS>;
  serviceName: ValueOf<typeof VERSION_PLATFORM>;
  test: string;
  to: string;
}
