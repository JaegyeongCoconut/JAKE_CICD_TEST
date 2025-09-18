import Cookies from "js-cookie";

import { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import { Auth } from "@repo/utils/auth";

import type { LoginServerModel } from "~types";

export class CarInspectionAuth extends Auth<LoginServerModel> {
  private static instance: CarInspectionAuth;

  constructor() {
    super(SERVICE_INFO.CAR_INSPECTION.objectName);
  }

  public static getInstance(): CarInspectionAuth {
    if (!CarInspectionAuth.instance) {
      CarInspectionAuth.instance = new CarInspectionAuth();
    }
    return CarInspectionAuth.instance;
  }

  protected setUser(user: LoginServerModel): void {
    this.user = user;
    Cookies.set(this.key, JSON.stringify(user));
  }

  protected onUserChange(user: LoginServerModel | null, error?: any): void {
    if (this.cb) {
      this.cb(user, error);
    }
  }

  public onAuthStateChanged(
    cb: (user: LoginServerModel | null, error: any) => void,
  ): void {
    this.cb = cb;
    this.onUserChange(this.user, null);
  }

  public signIn(data: LoginServerModel): void {
    this.setUser(data);
    this.onUserChange(this.user, null);
  }

  public onSignOut(): void {
    super.onSignOut();
  }

  public onChangeAccessToken(accessToken: string): void {
    if (!this.user) {
      throw new Error("onChangeAccessToken : user empty");
    }

    const updatedUser = {
      ...this.user,
      accessToken,
    };

    this.setUser(updatedUser);
    Cookies.set(this.key, JSON.stringify(updatedUser));
  }
}
