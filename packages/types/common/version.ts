import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static";

import { ValueOf } from "./method";

export interface AppVersion {
  new: string;
  old: string;
  os: ValueOf<typeof VERSION_OS>;
  test: string;
  serviceName: ValueOf<typeof VERSION_PLATFORM>;
  to: string;
}
