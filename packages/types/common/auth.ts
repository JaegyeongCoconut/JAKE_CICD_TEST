export interface LoginFormType {
  email: string;
  password: string;
}

export interface VerificationType {
  verificationCode: string;
}

export interface PasswordType {
  newPassword: string;
  confirmPassword: string;
}

export interface CreateNewPasswordFormType {
  newPassword: string;
  confirmPassword: string;
}

export interface InaccessInfo {
  [key: string | number]: {
    path: string[];
    redirectPage: string;
  };
}
