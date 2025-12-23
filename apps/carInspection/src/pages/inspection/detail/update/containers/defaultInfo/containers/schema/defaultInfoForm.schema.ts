import type { z } from "zod";

import { SCHEMA } from "@repo/utils/zod/schema";

export const schema = SCHEMA.OBJECT.DEFAULT({
  code: SCHEMA.STRING.DEFAULT,
  color: SCHEMA.STRING.REQUIRED,
  year: SCHEMA.STRING.REQUIRED,
  mileage: SCHEMA.STRING.REQUIRED,
  fuel: SCHEMA.STRING.REQUIRED,
  transmission: SCHEMA.STRING.REQUIRED,
});

export type DefaultInfoFormSchema = z.infer<typeof schema>;
