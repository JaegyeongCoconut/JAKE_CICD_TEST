import type { ToastMessage } from "@repo/types";

import type { CarInspectionLanguages } from "~types";

import { LANGUAGE_LABEL } from "./languageLabel";

export const TOAST_MESSAGE = {
  SUCCESS: {},
  WARNING: {
    INSPECTION_COMPLETED: {
      type: "warning",
      content: LANGUAGE_LABEL.FAILED_TO_COMPLETE_INSPECTION,
    },
    PHOTO_UPLOAD_FAIL: {
      type: "warning",
      content: LANGUAGE_LABEL.YOU_CAN_UPLOAD_UP_TO_3_FILES_AT_A_TIME,
    },
  },
} satisfies ToastMessage<CarInspectionLanguages>;
