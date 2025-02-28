const isCarService =
  __SERVICE_NAME__ === "carAdmin" ||
  __SERVICE_NAME__ === "carInspection" ||
  __SERVICE_NAME__ === "eCommerceAdmin";

export const COMMON_ERROR_MESSAGE = {
  ALREADY_CANCELED: "ALREADY_CANCELED",
  BAD_REQUEST: "Incorrect email or password.",
  CANNOT_UPDATE_PASSWORD: "Is not a current password",
  COLOR_HEX_CODE_INCORRECT: "Please enter a valid hex code.",
  COLOR_HEX_CODE_LENGTH: "Hex color code is 6 characters.",
  DATE_VALID: "Please enter the date in valid format. (DD/MM/YYYY)",
  DUPLICATE_SIGNIN_DETECTED: "DUPLICATE_SIGNIN_DETECTED",
  DUPLICATED_SIGNIN_DETECTED: "DUPLICATED_SIGNIN_DETECTED", // TODO: move admin, iot 서버 반영 및 웹에 배포 완료 후 삭제 필요
  EMAIL_EXISTS: "EMAIL_EXISTS",
  EMAIL_NOT_FOUND: "EMAIL_NOT_FOUND",
  EMAIL_VALID: "Please enter a valid email address.",
  EMAIL: "Please enter email address.",
  FIELD: isCarService
    ? "This field is mandatory."
    : "Please fill out this field.",
  FILE_UPLOAD_IMAGE: "Please upload image.",
  FILE_UPLOAD: "Please upload a file.",
  REQUIRED_DATE: isCarService
    ? "This field is mandatory."
    : "Please select the date.",
  REQUIRED_OPTION: isCarService
    ? "Please select the option."
    : "Please fill out this field.",
  REQUIRED_SELECT_ONE_MORE: isCarService
    ? "Please select more than 1."
    : "Please fill out this field.",

  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  MOBILE_VALID: "Please enter a valid mobile number.",
  PASSWORD_CONFIRM: "Password matches",
  PASSWORD_LENGTH: "8-20 characters",
  PASSWORD_TYPE: "At least 2 types (A-Z, a-z, numbers, symbols)",
  PASSWORD: "Please enter password.",
  SIGNIN_FAILED: "Incorrect email or password.",
  URL_INCORRECT: "Please enter a valid URL.",
  VEHICLE_ALREADY_REG_NO_EXISTS:
    "The plate number that you entered has been already registered.",
  VEHICLE_ALREADY_VIN_EXISTS: "The frame number you've entered already exists.",
  VERIFY_CODE_EXPIRED: "The verification code has expired. Please try again.",
  VERIFY_CODE_INCORRECT: "The verification code is incorrect.",
  VERSION_INCORRECT: "Please enter the version in valid format. (0.0.0)",
} as const;

export const ADMIN_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  ACCOUNT_CHECK_FAILED: "ACCOUNT_CHECK_FAILED",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  BATTERY_NOT_FOUND: "BATTERY_NOT_FOUND",
  CANNOT_DISPATCH_DRIVER: "CANNOT_DISPATCH_DRIVER",
  CANNOT_UPDATE_VEHICLE: "CANNOT_UPDATE_VEHICLE",
  CANNOT_UPDATE_TYPE: "CANNOT_UPDATE_TYPE",
  DRIVER_ALREADY_EXISTS: "DRIVER_ALREADY_EXISTS",
  // TODO: 해당으로 서버에서 에러 반환을 해주는지 확인 필요
  BANK_PHONE_ALREADY_USED: "This IB Cool Wallet number is already registered.",
  BANK_PHONE_VALID: "Please enter a valid IB Cool Wallet number.",
  CANNOT_UPDATE_DRIVER_STATUS: "CANNOT_UPDATE_DRIVER_STATUS",
  CANNOT_UPDATE_SAME_NUMBER: "CANNOT_UPDATE_SAME_NUMBER",
  CANNOT_UPDATE_STATUS: "Status cannot be changed.",
  DIGIT_NUM: "Please enter the 10~15 digit number.",
  DRIVER_CHARGE_POINT_LIMIT: "Please enter 1 ~ 1,000,000,000 P.",
  DRIVER_GROUP_REQUIRED: "Please select group.",
  DRIVER_NOT_FOUND: "DRIVER_NOT_FOUND",
  DRIVER_TYPE_REQUIRED: "Please select driver type.",
  EMAIL_ALREADY_USED: "This email is already registered.",
  END_TIME_BEFORE_THAN_START_TIME: "Start date must be prior to the end date.",
  HELP_ALREADY_ANSWERED: "HELP_ALREADY_ANSWERED",
  INFO: "Please fill in the required information.",
  INVALID_SIGNIN: "INVALID_SIGNIN",
  MOBILE_ALREADY: "This mobile number is already registered.",
  ORDER_NUMBER: "Please check the order number format.",
  PASSWORD_INCORRECT: "Is not a current password.",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PHONE_ALREADY_USED: "PHONE_ALREADY_USED",
  REGISTERED_CODE: "This code is already registered.",
  REGISTERED_MANUFACTURE_NUMBER: "This number is already registered.",
  REGISTERED_REG_NO:
    "The plate number that you entered has been already registered.",
  REGISTERED_VIN: "The frame number you've entered already exists.",
  SELECT_TIME_BEFORE_THAN_ORIGIN_END_TIME:
    "Date edited must be behind the date selected.",
  TIME_VALID: "Please check the time format.",
  TRANSPORT_NOT_FOUND: "TRANSPORT_NOT_FOUND",
  VAILED_IB_COOL_NUMBER: "Please enter a vaild IB Cool Wallet number",
  VEHICLE_REQUIRED: "Please select vehicle.",
  VEHICLE_SERVICE_FIELD: "Please select more than 1.",
  VEHICLE_ALREADY_EXISTS: "VEHICLE_ALREADY_EXISTS",
  // MOBILE: "Enter the mobile number", // NOTE: client 에서는 사용 안 하는데 구글 번역 시트에는 있음 확인 필요
  // CHARGING_POINT: "The requested amount and the charging amount are different.", // NOTE: 구글 번역 시트에 있음. client에서 사용 안 함 확인 필요
} as const;

export const LOGISTICS_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  ALREADY_EXISTS_ID: "This login ID is already registered.",
  ALREADY_EXISTS_PLATE_NUMBER:
    "The plate number that you entered has been already registered.",
} as const;

export const IOT_ERROR_MESSAGE = { ...COMMON_ERROR_MESSAGE } as const;

export const CAR_ADMIN_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  AT_LEAST_ONE_COLOR: "Please add at least 1 color.",
  ONLY_ENGLISH_NUMBERS_SPECIAL_CHARACTERS:
    "Only english, numbers, special characters",
  SAME_OPTION_NAME: "The option name you've entered already exists.",
  SAME_MAIN_CATEGORY:
    "The main category color name you've entered already exists.",
  SAME_SUB_CATEGORY:
    "The sub category color name you've entered already exists.",
  ALREADY_COLOR_EXISTS: "This color name has been already registered.",
} as const;

export const CAR_INSPECTION_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  INVALID_PASSWORD: "INVALID_PASSWORD",
} as const;

export const ECOMMERCE_ADMIN_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
  SAME_CATEGORY: "You have selected a category that cannot be chosen.",
} as const;

export const MEMBERSHIP_ADMIN_ERROR_MESSAGE = {
  ...COMMON_ERROR_MESSAGE,
} as const;
