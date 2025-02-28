import { BASE_LABEL } from "../../constants/baseLabel";

export const BANNER_STATUS_LIST = [
  { key: 0, label: BASE_LABEL.ON },
  { key: 1, label: BASE_LABEL.OFF },
] as const;

export const BANNER_LINK_RADIOS = [
  { key: "url", label: BASE_LABEL.URL },
  { key: "notice", label: BASE_LABEL.NOTICE },
] as const;
