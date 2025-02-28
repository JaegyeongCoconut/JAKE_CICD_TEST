import { SERVICE_INFO } from "@repo/assets/static";

import { ValueOf } from "../common/method";

declare global {
  const __SERVICE_NAME__: ValueOf<typeof SERVICE_INFO>["serviceName"];
}
