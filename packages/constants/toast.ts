import type {
  Languages,
  ToastMessage,
} from "@repo/types";

import { LANGUAGE_LABEL } from "./languageLabel";

export const COMMON_TOAST_MESSAGE = {
  SUCCESS: {
    COPY_DRIVER_MOBILE: {
      type: "success",
      content:
        LANGUAGE_LABEL.COPIED_THE_MOBILE_NUMBER,
    },
    COPY_LINK: {
      type: "success",
      content:
        LANGUAGE_LABEL.LINK_HAS_BEEN_COPIED,
    },
    COPY_MOBILE: {
      type: "success",
      content:
        LANGUAGE_LABEL.MOBILE_NUMBER_HAS_BEEN_COPIED,
    },
    PASSWORD_CHANGE: {
      type: "success",
      content:
        LANGUAGE_LABEL.PASSWORD_HAS_BEEN_CHANGED,
    },
    PASSWORD_COPIED: {
      type: "success",
      content:
        LANGUAGE_LABEL.PASSWORD_HAS_BEEN_COPIED,
    },
    STATUS_CHANGE: {
      type: "success",
      content:
        LANGUAGE_LABEL.STATUS_HAS_BEEN_CHANGED,
    },
  },
  WARNING: {
    CANNOT_FIND_ROUTABLE_POINT: {
      type: "warning",
      content:
        LANGUAGE_LABEL.A_PROBLEM_OCCURRED_WHILE_CALCULATING_THE_ROUTE_SO_THE_ROUTE_CANNOT_BE_DISPLAYED,
    },
    COPY_DRIVER_MOBILE_FAIL: {
      type: "warning",
      content:
        LANGUAGE_LABEL.FAILED_COPYING_MOBILE_NUMBER_PLEASE_TRY_AGAIN_LATER,
    },
    FAIL_FILE_UPLOAD_500KB: {
      type: "warning",
      content:
        LANGUAGE_LABEL.THE_FILE_CANNOT_EXCEED_MORE_THAN_0_5MB,
    },
    ROUTE_DISTANCE_EXCEED: {
      type: "warning",
      content:
        LANGUAGE_LABEL.THE_ROUTE_CANNOT_BE_DISPLAYED_BECAUSE_IT_EXCEEDS_2000_KM,
    },
  },
} satisfies ToastMessage<Languages>;
