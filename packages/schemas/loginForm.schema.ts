import type z from "zod";

import { REFINE } from "@repo/utils/zod/refine";
import { SCHEMA } from "@repo/utils/zod/schema";

export const loginSchema = SCHEMA.OBJECT.DEFAULT({
  email: SCHEMA.STRING.REQUIRED.refine(REFINE.EMAIL.test, REFINE.EMAIL.error),
  password: SCHEMA.STRING.REQUIRED,
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
