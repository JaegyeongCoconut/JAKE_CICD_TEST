import type { RecursiveUndefined } from "./api";

export interface ResetRandomPasswordServerModel {
  password: string;
}

export type ResetRandomPasswordClientModel =
  RecursiveUndefined<ResetRandomPasswordServerModel>;
