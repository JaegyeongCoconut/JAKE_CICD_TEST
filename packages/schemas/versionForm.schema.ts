import type z from "zod";

import { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";
import { getLiteralArrayFromKeyPair } from "@repo/utils/method";
import { REFINE } from "@repo/utils/zod/refine";
import { SCHEMA } from "@repo/utils/zod/schema";

export const versionSchema = SCHEMA.OBJECT.DEFAULT({
  os: SCHEMA.ENUM.NULLABLE(getLiteralArrayFromKeyPair(VERSION_OS)).refine(
    REFINE.REQUIRED_STRING.test,
    REFINE.REQUIRED_STRING.error(),
  ),
  platform: SCHEMA.ENUM.NULLABLE(
    getLiteralArrayFromKeyPair(VERSION_PLATFORM),
  ).refine(REFINE.REQUIRED_STRING.test, REFINE.REQUIRED_STRING.error()),
  old: SCHEMA.STRING.REQUIRED.refine(REFINE.VERSION.test, REFINE.VERSION.error),
  new: SCHEMA.STRING.REQUIRED.refine(REFINE.VERSION.test, REFINE.VERSION.error),
  test: SCHEMA.STRING.REQUIRED.refine(
    REFINE.VERSION.test,
    REFINE.VERSION.error,
  ),
});

export type VersionFormSchema = z.infer<typeof versionSchema>;
