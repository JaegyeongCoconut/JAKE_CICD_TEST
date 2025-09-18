import type { resources } from "~assets";

export type CarInspectionLanguages =
  keyof (typeof resources)["en"]["translation"];
