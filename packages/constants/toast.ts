import type { Languages } from "@repo/types";

export const COMMON_TOAST_MESSAGE = {
  SUCCESS: {
    ACCOUNT_UPDATE: {
      type: "success",
      content: "The account information has been changed.",
    },
    BANNER_CREATE: {
      type: "success",
      content: "The banner has been added.",
    },
    BANNER_DELETED: {
      type: "success",
      content: "The banner has been deleted.",
    },
    COPY_DRIVER_MOBILE: {
      type: "success",
      content: "Copied the mobile number.",
    },
    CREATE_ALARM: {
      type: "success",
      content: "Your message has been sent successfully.",
    },
    DISPATCH_CANCEL: {
      type: "success",
      content: "Dispatch has been canceled.",
    },
    NOTICE_CREATE: {
      type: "success",
      content: "The notice has been added.",
    },
    NOTICE_UPDATE: {
      type: "success",
      content: "The notice has been changed.",
    },
    PASSWORD_CHANGE: {
      type: "success",
      content: "Password has been changed.",
    },
    UPDATE_VERSION: {
      type: "success",
      content: "The update version has been edited successfully.",
    },
    STATUS_CHANGE: {
      type: "success",
      content: "Status has been changed.",
    },
  },
  WARNING: {
    BANNER_DELETE_FAIL: {
      type: "warning",
      content: "If the banner status is 'ON', it cannot be deleted.",
    },
    BANNER_MODIFY_FAIL: {
      type: "warning",
      content: "If the banner status is 'ON', it cannot be modified.",
    },
    CANNOT_FIND_ROUTABLE_POINT: {
      type: "warning",
      content:
        "A problem occurred while calculating the route, so the route cannot be displayed.",
    },
    COPY_DRIVER_MOBILE_FAIL: {
      type: "warning",
      content: "Failed copying mobile number, please try again later.",
    },
    FAIL_ALARM: {
      type: "warning",
      content: "Failed to send the message, please try again later.",
    },
    FAIL_FILE_UPLOAD_500KB: {
      type: "warning",
      content: "The file cannot exceed more than 0.5MB.",
    },
    FAIL_FILE_UPLOAD_1MB: {
      type: "warning",
      content: "The file cannot exceed more than 1MB.",
    },
    FAIL_FILE_UPLOAD_5MB: {
      type: "warning",
      content: "The file cannot exceed more than 5MB.",
    },
    NOT_SUPPORT_FILE_FORMAT: {
      type: "warning",
      content: "File format is not supported.",
    },
    ROUTE_DISTANCE_EXCEED: {
      type: "warning",
      content: "The route cannot be displayed because it exceeds 2,000 km.",
    },
  },
} as const;

export const ADMIN_TOAST_MESSAGE = {
  SUCCESS: {
    ...COMMON_TOAST_MESSAGE.SUCCESS,
    ADMIN_CREATE: {
      type: "success",
      content: "The administrator account has been added.",
    },
    ADMIN_DELETE: {
      type: "success",
      content: "The administrator account has been deleted.",
    },
    ADMIN_UPDATE: {
      type: "success",
      content: "The administrator account information has been changed.",
    },
    ADVERTISEMENT_ADD: {
      type: "success",
      content: "The advertisement has been added successfully.",
    },
    ADVERTISEMENT_EDIT: {
      type: "success",
      content: "The advertisement has been edited successfully.",
    },
    CATEGORY_CREATE: {
      type: "success",
      content: "Category has been added.",
    },
    CHANGE_DRVIER_STATUS_OF_TRAINING: {
      type: "success",
      content: "Status has been changed.",
    },
    CLIENT_DELETE: {
      type: "success",
      content: "Client account has been deleted.",
    },
    COUPON_CREATE_COMPLETE: {
      type: "success",
      content: "The coupon has been added.",
    },
    COUPON_UPDATE_COMPLETE: {
      type: "success",
      content: "The coupon information has been changed.",
    },
    DELETE_POINT_HISTORY: {
      type: "success",
      content: "The point history has been deleted." as Languages, // NOTE: 번역 불요
    },
    DRIVER_APPROVE: {
      type: "success",
      content: "Verification completed.",
    },
    DRIVER_DELETE: {
      type: "success",
      content: "Driver account has been deleted.",
    },
    DRIVER_SCHEDULE_CHANGE: {
      type: "success",
      content: "The schedule has been changed.",
    },
    DRIVER_TYPE_CHANGE: {
      type: "success",
      content: "The driver type has been changed.",
    },
    DRIVER_VEHICLE_MATCH: {
      type: "success",
      content: "The vehicle information has been changed.",
    },
    DRIVER_VEHICLE_PLATE_NUMBER: {
      type: "success",
      content: "Plate number has been changed.",
    },
    DRIVER_VEHICLE_SERVICE: {
      type: "success",
      content: "Service type has been changed.",
    },
    DRIVER_VEHICLE_STATUS: {
      type: "success",
      content: "Status has been changed.",
    },
    EARNINGS_CHANGE_COMPLETE: {
      type: "success",
      content: "Hero earnings has been changed.",
    },
    MOBILE_CHANGE: {
      type: "success",
      content: "Mobile number has been changed.",
    },
    MOVE_DISPATCH_COMPLETE: {
      type: "success",
      content: "Dispatch has been completed.",
    },
    NOTE_DELETE: {
      type: "success",
      content: "The note has been deleted.",
    },
    NOTICE_DELETED: {
      type: "success",
      content: "The notice has been deleted.",
    },
    PINNED: {
      type: "success",
      content: "The notice has been pinned.",
    },
    POINT_CHARGING_COMPLETE: {
      type: "success",
      content: "The point charge has been completed.",
    },
    POINT_CHARGING_COMPLETED: {
      type: "success",
      content: "Points charging completed.",
    },
    POINTS_REJECT_COMPLETE: {
      type: "success",
      content: "The point charge request has been rejected.",
    },
    POPUP_STATUS_UPDATED: {
      type: "success",
      content: "The popup status has been changed successfully.",
    },
    POPUP_CREATE: {
      type: "success",
      content: "The popup has been added.",
    },
    POPUP_UPDATE: {
      type: "success",
      content: "The popup has been updated.",
    },
    REPLY_CREATE: {
      type: "success",
      content: "The reply has been added.",
    },
    SETTLEMT_COMPLETE: {
      type: "success",
      content: "The hero's(or driver's) settlement amount has been modified.",
    },
    UNPINNED: {
      type: "success",
      content: "The notice has been unpinned.",
    },
    UPDATE_COUPON_PRIVATE_USER_FILE_UPLOAD: {
      type: "success",
      content: "The file has been changed successfully.",
    },
    UPDATE_DRIVER_BANK_PHONE: {
      type: "success",
      content: "IB Cool Wallet number has been changed.",
    },
    UPDATE_DRIVER_SERVICE_AREA: {
      type: "success",
      content: "Service area has been changed.",
    },
    UPDATE_DRIVER_HERO_TYPE: {
      type: "success",
      content: "Hero type has been changed.",
    },
    UPDATE_DRIVER_NAME: {
      type: "success",
      content: "The name has been revised successfully.",
    },
    UPDATE_PAYMENT_GATEWAY: {
      type: "success",
      content: "The payment gateway has been changed." as Languages, // NOTE: 번역 불요
    },
    VEHICLE_CREATE: {
      type: "success",
      content: "The vehicle has been added successfully.",
    },
    WITHDRAWAL_COMPLETE: {
      type: "success",
      content: "The withdrawal has been completed.",
    },
    WITHDRAWAL_REJECT_COMPLETE: {
      type: "success",
      content: "The withdrawal request has been rejected.",
    },
    VEHICLE_BRAND_CHANGE: {
      type: "success",
      content: "Brand has been changed.",
    },
    VEHICLE_FRAME_NUMBER_CHANGE: {
      type: "success",
      content: "Frame number has been added.",
    },
    VEHICLE_FUEL_TYPE_CHANGE: {
      type: "success",
      content: "Fuel type has been changed.",
    },
    VEHICLE_MODEL_CHANGE: {
      type: "success",
      content: "Model has been changed.",
    },
    VEHICLE_OWNERSHIP_CHANGE: {
      type: "success",
      content: "Owner has been changed.",
    },
    VEHICLE_PACKAGE_FEE_UPDATE: {
      type: "success",
      content: "Conditions have been changed.",
    },
    VEHICLE_TYPE_CHANGE: {
      type: "success",
      content: "The vehicle type has been changed." as Languages, // NOTE: 번역 불요
    },
    BATTERY_ADD: {
      type: "success",
      content: "The battery has been added.",
    },
    DRIVER_PROFILE_CHANGE: {
      type: "success",
      content: "The profile has been revised.",
    },
  },
  WARNING: {
    ...COMMON_TOAST_MESSAGE.WARNING,
    ALREADY_CANCELED: {
      type: "warning",
      content: "The order has been canceled.",
    },
    CANNOT_DISPATCH_DRIVER: {
      type: "warning",
      content: "There is an ongoing order or a payment has not been completed.",
    },
    CANNOT_FIND_MONITORING_DRIVER_LOCATION: {
      type: "warning",
      content:
        "Location of this vehicle is currently out of service. Please try again later.",
    },
    FAIL_DELETE_POINT_HISTORY: {
      type: "warning",
      content:
        "The point history cannot be deleted.\nThe order has already been completed." as Languages, // NOTE: 번역 불요
    },
    DRIVER_NOT_FOUND: {
      type: "warning",
      content: "There are no vehicles nearby, please select another order.",
    },
    DRIVER_TYPE_CHANGE: {
      type: "warning",
      content:
        "If there is a matched vehicle, the driver type cannot be changed.",
    },
    DRIVER_VEHICLE_NOT_MATCH: {
      type: "warning",
      content: "Vehicle status cannot be changed.",
    },
    DRIVER_VEHICLE_STATUS: {
      type: "warning",
      content: "Unmatching the vehicle and driver, then try again.",
    },
    FAIL_FILE_LENGTH_900_1200: {
      type: "warning",
      content: "Please check the photo size (900x1200px).",
    },
    FILTER_MAX_NUM: {
      type: "warning",
      content: "Each filter can only be applied up to 5.",
    },
    HUB_PROCESS_FAIL: {
      type: "warning",
      content:
        "Processing is possible at once only if the departure hub and arrival hub are the same.",
    },
    INQUIRY_ANSWER_ALREADY_EXIST: {
      type: "warning",
      content: "The inquiry has already been answered.",
    },
    MOBILE_ALREADY: {
      type: "warning",
      content: "This mobile number is already registered.",
    },
    MOVE_MANAGEMENT_ORDER_PAYMENT_STATUS_FAILED: {
      type: "warning",
      content: "Please change payment status",
    },
    PIN_FAIL: {
      type: "warning",
      content: "You can pin up to 5 posts.",
    },
    POINT_INSUFFICIENT_DISPATCH_FAIL: {
      type: "warning",
      content:
        "We are unable to proceed with this shipment due to insufficient driver points.",
    },
    POPUP_CAN_PINNED_ONLY_ONE: {
      type: "warning",
      content: "Only 1 popup can be pinned.",
    },
    ROUTE_OVERLAP: {
      type: "warning",
      content: "The route is already set.",
    },
    ROUTE_SET_FAIL: {
      type: "warning",
      content: "The route is not set.",
    },
    SETTLEMT_FAIL: {
      type: "warning",
      content:
        "Failed to modify the hero's (or driver's) settlement amount. Please try again later.",
    },
    SHIPMENT_ALREADY_ONGOING: {
      type: "warning",
      content: "There is an ongoing order or a payment has not been completed.",
    },
    STATUS_CHANGE_FAIL: {
      type: "warning",
      content: "Status cannot be changed.",
    },
    BATTERY_ADD_FAIL: {
      type: "warning",
      content: "Failed to add the battery.",
    },
    POPUP_EDIT_FAIL: {
      type: "warning",
      content:
        "It cannot be modified if the popup status has been set as 'ON'.",
    },
    POPUP_DELETE_FAIL: {
      type: "warning",
      content: "It cannot be deleted if the popup status has been set as 'ON'.",
    },
    POPUP_ALREADY_DELETE: {
      type: "warning",
      content: "The popup has already been deleted.",
    },
    VEHICLE_STATUS_UPDATE: {
      type: "warning",
      content: "Vehicle status cannot be changed.",
    },
    VEHICLE_MATCH: {
      type: "warning",
      content: "Failed to match the vehicle",
    },
  },
} as const;

export const LOGISTICS_TOAST_MESSAGE = {
  SUCCESS: {
    ...COMMON_TOAST_MESSAGE.SUCCESS,

    CREATE_PROPERTY_VEHICLE: {
      type: "success",
      content: "The vehicle has been added successfully.",
    },
    DELETE_PROPERTY_DRIVER: {
      type: "success",
      content: "Driver has been deleted.",
    },
    DELETE_PROPERTY_VEHICLE: {
      type: "success",
      content: "Vehicle has been deleted.",
    },
    CREATE_PROPERTY_DRIVER: {
      type: "success",
      content: "Driver has been added.",
    },
    UPDATE_PROPERTY_DRIVER: {
      type: "success",
      content: "Driver information has been changed.",
    },
    UPDATE_PROPERTY_VEHICLE: {
      type: "success",
      content: "The vehicle information has been changed.",
    },
    UPDATE_PROPERTY_VEHICLE_STATUS: {
      type: "success",
      content: "Status has been changed.",
    },
    INVOICE_DISPATCH_COMPLETE: {
      type: "success",
      content: "Dispatch has been completed.",
    },
    UPDATE_DELIVERY_ROUTE: {
      type: "success",
      content: "The routes has been edited successfully.",
    },
    UPDATE_DISPATCH_DRIVER: {
      type: "success",
      content: "Driver has been changed.",
    },
    UPDATE_DISPATCH_VEHICLE: {
      type: "success",
      content: "Truck has been changed.",
    },
    UPDATE_INVOICE_STATUS: {
      type: "success",
      content: "Status has been changed.",
    },
    DELETE_INVOICE: {
      type: "success",
      content: "The invoice has been deleted.",
    },
    UPDATE_INVOICE_BOX_INFO: {
      type: "success",
      content: "Box information has been changed.",
    },
  },
  WARNING: {
    ...COMMON_TOAST_MESSAGE.WARNING,
    UPDATE_PROPERTY_DRIVER_VEHICLE_EXIST_SCHEDULE: {
      type: "warning",
      content:
        "Unable to process your request due to shipping schedule exists.",
    },
    ROUTE_SETTING_NOT_AVAILABLE: {
      type: "warning",
      content: "The route setting is not available.",
    },
  },
} as const;

export const CAR_INSPECTION_TOAST_MESSAGE = {
  WARNING: {
    PHOTO_UPLOAD_FAIL: {
      type: "warning",
      content: "You can upload up to 3 files at a time.",
    },
    INSPECTION_COMPLETED: {
      type: "warning",
      content: "Failed to complete inspection.",
    },
  },
} as const;

export const CAR_ADMIN_TOAST_MESSAGE = {
  SUCCESS: {
    ...COMMON_TOAST_MESSAGE.SUCCESS,
    BANNER_STATUS_UPDATE: {
      type: "success",
      content: "The banner Information has been changed.",
    },
    COLOR_CREATE: {
      type: "success",
      content: "Color has been added.",
    },
    COLOR_UPDATE: {
      type: "success",
      content: "Color information has been updated.",
    },
    COLOR_COMBINATION_UPDATE: {
      type: "success",
      content: "Color combination has been updated.",
    },
    CREATE_BRANCH: {
      type: "success",
      content: "Branch has been added.",
    },
    CREATE_MANAGER: {
      type: "success",
      content: "The manager account has been added.",
    },
    CREATE_USEDCARS_PURCHASE: {
      type: "success",
      content: "The car has been added successfully.",
    },
    DELETE_BRANCH: {
      type: "success",
      content: "Branch has been deleted.",
    },
    DELETE_MANAGER: {
      type: "success",
      content: "The manager account has been deleted.",
    },
    PASSWORD_CHANGED: {
      type: "success",
      content: "Password has been changed",
    },
    PURCHASE_CANCELED: {
      type: "success",
      content: "The purchase inquiry has been canceled successfully.",
    },
    REPLY_UPDATE: {
      type: "success",
      content: "Reply has been added.",
    },
    UPDATE_MANAGER: {
      type: "success",
      content: "The manager account information has been changed.",
    },
    TOP_BANNER_CREATE: {
      type: "success",
      content: "The banner has been added.",
    },
    TOP_BANNER_UPDATE: {
      type: "success",
      content: "The banner Information has been changed.",
    },
    NATIVE_AD_CREATE: {
      type: "success",
      content: "The native ad has been added.",
    },
    NATIVE_AD_UPDATE: {
      type: "success",
      content: "The native ad has been updated.",
    },
    MIDDLE_BANNER_CREATE: {
      type: "success",
      content: "The banner has been added.",
    },
    MIDDLE_BANNER_UPDATE: {
      type: "success",
      content: "The banner has been updated.",
    },
    RECOMMENDED_MODEL_UPDATE: {
      type: "success",
      content: "Model recommendation status has been changed successfully.",
    },
    NEWCAR_CREATE: {
      type: "success",
      content:
        "Specifications and options of the new car has been applied successfully.",
    },
    UPDATE_PRICE_PHOTO: {
      type: "success",
      content: "The price and photo(s) have been registered successfully.",
    },
    USED_CAR_UPDATE: {
      type: "success",
      content:
        "Specifications and options of the used car has been applied successfully.",
    },
    UPDATE_BRANCH: {
      type: "success",
      content: "Branch information has been updated.",
    },
    CHANGE_NEW_CAR_MODEL_STATUS_AND_BRANCH: {
      type: "success",
      content:
        "Status of a new car model has been changed successfully. This car model will be visible from the App now.",
    },
    CHANGE_NEW_CAR_MODEL_SALES_BRANCH: {
      type: "success",
      content: "Sales branch has been changed.",
    },
    UPDATE_NEW_CAR_MODEL_PHOTOS: {
      type: "success",
      content: "Photo(s) has been registered successfully.",
    },
    UPDATE_USED_CAR_PAINTING_INFO: {
      type: "success",
      content: "Painting information has been updated.",
    },
    UPDATE_USED_CAR_REPAIRING_INFO: {
      type: "success",
      content: "Repairing information has been updated.",
    },
    CUSTOMER_CREATE: {
      type: "success",
      content: "Customer information has been registered successfully.",
    },
    CUSTOMER_UPDATE: {
      type: "success",
      content: "Customer information has been updated.",
    },
    VEHICLE_SALES_STATUS_STOPPED: {
      type: "success",
      content: "Vehicle sales status has been paused.",
    },
    UPDATE_FRAME_NUMBER: {
      type: "success",
      content: "Frame number has been updated.",
    },
  },
  WARNING: {
    ...COMMON_TOAST_MESSAGE.WARNING,
    BANNER_ALREADY_DELETE: {
      type: "warning",
      content: "The banner has already been deleted.",
    },
    DELETE_BRANCH: {
      type: "warning",
      content: "The branch has already been deleted.",
    },
    DELETE_MANAGER: {
      type: "warning",
      content: "The manager account has already been deleted.",
    },
    NATIVE_AD_ALREADY_DELETE: {
      type: "warning",
      content: "The native ad has already been deleted.",
    },
    REPLY_UPDATE: {
      type: "warning",
      content: "The inquiry has already been answered.",
    },
    FAIL_FILE_UPLOAD_1MB: {
      type: "warning",
      content: "The file cannot exceed more than 1MB.",
    },
    FAIL_FILE_LENGTH_1440_400: {
      type: "warning",
      content: "Please check the photo size (1440x400px).",
    },
    FAIL_FILE_LENGTH_1440_160: {
      type: "warning",
      content: "Please check the photo size (1440x160px).",
    },
    FAIL_FILE_LENGTH_1440_320: {
      type: "warning",
      content: "Please check the photo size (1440x320px).",
    },
    CREATE_USEDCARS_PURCHASE_FAIL: {
      type: "warning",
      content: "Failed to add a car, please try again.",
    },
    MIDDLE_BANNER_CAN_PINNED_ONLY_ONE: {
      type: "warning",
      content: "Only 1 middle banner can be pinned.",
    },
    MAX_FILE_UPLOAD_4_COUNT_EXCCED: {
      type: "warning",
      content: "You can upload up to 4 photos.",
    },
    MAX_FILE_UPLOAD_20_COUNT_EXCCED: {
      type: "warning",
      content: "You can upload up to 20 photos.",
    },
    MOBILE_ALREADY: {
      type: "warning",
      content: "This mobile number is already registered.",
    },
  },
} as const;
// NOTE: 임시 추가
export const ECOMMERCE_ADMIN_TOAST_MESSAGE = {
  SUCCESS: {
    ...COMMON_TOAST_MESSAGE.SUCCESS,
    CREATE_CATEGORY: {
      type: "success",
      content: "The category has been added." as Languages,
    },
    DELETE_CATEGORY: {
      type: "success",
      content: "The category has been deleted." as Languages,
    },
    UPDATE_CATEGORY: {
      type: "success",
      content: "The category has been updated." as Languages,
    },
    CREATE_PRODUCT: {
      type: "success",
      content: "The product has been added." as Languages,
    },
    DELETE_PRODUCT: {
      type: "success",
      content: "The product has been deleted." as Languages,
    },
    UPDATE_PRODUCT: {
      type: "success",
      content: "The product has been updated." as Languages,
    },
  },
  WARNING: {
    ...COMMON_TOAST_MESSAGE.WARNING,
    CREATE_CATEGORY: {
      type: "warning",
      content: "The category hasn't been added." as Languages,
    },
    DELETE_CATEGORY: {
      type: "warning",
      content: "The category hasn't deleted." as Languages,
    },
    UPDATE_CATEGORY: {
      type: "warning",
      content: "The category hasn't been updated." as Languages,
    },
    CREATE_PRODUCT: {
      type: "warning",
      content: "The product hasn't been added." as Languages,
    },
    DELETE_PRODUCT: {
      type: "warning",
      content: "The product hasn't deleted." as Languages,
    },
    UPDATE_PRODUCT: {
      type: "warning",
      content: "The product hasn't been updated." as Languages,
    },
  },
} as const;

export const MEMBERSHIP_ADMIN_TOAST_MESSAGE = {
  SUCCESS: {
    ...COMMON_TOAST_MESSAGE.SUCCESS,
  },
  WARNING: {
    ...COMMON_TOAST_MESSAGE.WARNING,
  },
} as const;
