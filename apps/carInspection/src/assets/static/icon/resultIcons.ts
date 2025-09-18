import {
  CloseCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "~assets";

export const STATUS_ICONS = {
  pass: CheckCircleIcon,
  bad: CloseCircleIcon,
  normal: ExclamationCircleIcon,
} as const;

export const STATUS_ICON_COLOR = {
  pass: "green_50",
  bad: "red_50",
  normal: "yellow_60",
} as const;
