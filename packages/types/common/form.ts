import type { VERSION_OS, VERSION_PLATFORM } from "@repo/assets/static/version";

import type { AppVersion } from "./version";

export type FormType = "create" | "update";

export interface FormVersion
  extends Omit<AppVersion, "serviceName" | "to" | "os"> {
  os: keyof typeof VERSION_OS | null;
  platform: keyof typeof VERSION_PLATFORM | null;
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface FormResetPassword {
  confirmPassword: string;
  newPassword: string;
  verify: {
    hasVerified: boolean;
    isAuthCodeSend: boolean;
    email: string;
    token: string | null;
    verificationCode: string;
  };
}
