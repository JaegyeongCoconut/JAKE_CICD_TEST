import Cookies from "js-cookie";

import { SERVICE_INFO } from "@repo/assets/static";

interface AuthUser {
  refreshToken: string;
  accessToken: string;
}

export type UserCB<T> = (user: T | null, error: any) => void;

export class Auth<T extends AuthUser> {
  protected key: string;
  public user: T | null = null;
  protected cb: UserCB<T> | null = null;
  protected objectName: keyof typeof SERVICE_INFO;

  protected constructor(objectName: keyof typeof SERVICE_INFO) {
    this.key = SERVICE_INFO[objectName].cookieName;
    this.objectName = objectName;
  }

  get isAuth() {
    return !!this.user?.refreshToken;
  }

  get accessToken() {
    return this.user?.accessToken;
  }

  get refreshToken() {
    return this.user?.refreshToken;
  }

  resolveUser() {
    if (window) {
      const signedInUser = Cookies.get(this.key);

      if (signedInUser) {
        this.setUser(JSON.parse(signedInUser));
      }
    }

    return this;
  }

  signOut() {
    Cookies.remove(this.key);
    this.onUserChange(null, null);
    this.user = null;
  }

  protected setUser(user: T): void {}

  protected onUserChange(user: T | null, error?: any): void {}

  protected changeAccessToken(token: string): void {}

  protected onAuthStateChanged(cb: UserCB<T>): void {}

  protected signIn(data: T): void {}
}
