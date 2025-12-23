import type z from "zod";

import { REFINE } from "@repo/utils/zod/refine";
import { SCHEMA } from "@repo/utils/zod/schema";

import { INSPECTION_STATUS_OBJECT_ARRAY } from "~assets";

const checklistSchema = SCHEMA.ARRAY.OBJECT.DEFAULT({
  no: SCHEMA.NUMBER,
  title: SCHEMA.STRING.DEFAULT,
  titleEn: SCHEMA.STRING.REQUIRED,
  titleLo: SCHEMA.STRING.REQUIRED,
  photos: SCHEMA.ARRAY.UNION.STRING_FILE_NULLABLE,
  status: SCHEMA.ENUM.NULLABLE(
    INSPECTION_STATUS_OBJECT_ARRAY.map(({ label }) => label),
  ).refine(REFINE.REQUIRED_STRING.test, REFINE.REQUIRED_STRING.error()),
  remark: SCHEMA.STRING.DEFAULT,
});

export const schema = SCHEMA.OBJECT.DEFAULT({
  isCompleted: SCHEMA.BOOLEAN,
  exteriorCount: SCHEMA.NUMBER,
  interiorCount: SCHEMA.NUMBER,
  undersideCount: SCHEMA.NUMBER,
  engineCount: SCHEMA.NUMBER,
  exteriorChecklist: checklistSchema,
  interiorChecklist: checklistSchema,
  engineChecklist: checklistSchema,
  undersideChecklist: checklistSchema,
});

export type CheckListFormSchema = z.infer<typeof schema>;
