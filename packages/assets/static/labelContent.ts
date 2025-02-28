import { BASE_LABEL } from "../../constants/baseLabel";

export const BANNER_DETAIL_INFO = [
  [{ key: "idx", heading: BASE_LABEL.ORDER }],
  [{ key: "status", heading: BASE_LABEL.STATUS }],
  [{ key: "link", heading: BASE_LABEL.LINKED }],
  [{ key: "imageS3Url", heading: BASE_LABEL.BANNER_IMAGE }],
  [{ key: "color", heading: BASE_LABEL.BACKGROUND_COLOR }],
  [{ key: "created", heading: BASE_LABEL.CREATED_DATE }],
] as const;

export const MIDDLE_BANNER_DETAIL_INFO = [
  [{ key: "status", heading: BASE_LABEL.STATUS }],
  [{ key: "link", heading: BASE_LABEL.LINKED }],
  [{ key: "imageS3Url", heading: BASE_LABEL.BANNER_IMAGE }],
  [{ key: "color", heading: BASE_LABEL.BACKGROUND_COLOR }],
  [{ key: "created", heading: BASE_LABEL.CREATED_DATE }],
] as const;

export const NATIVE_AD_DETAIL_INFO = [
  [{ key: "status", heading: BASE_LABEL.STATUS }],
  [{ key: "title", heading: BASE_LABEL.TITLE_DESC }],
  [{ key: "link", heading: BASE_LABEL.LINKED }],
  [{ key: "imageS3Url", heading: BASE_LABEL.BANNER_IMAGE }],
  [{ key: "color", heading: BASE_LABEL.BACKGROUND_COLOR }],
  [{ key: "created", heading: BASE_LABEL.CREATED_DATE }],
] as const;
