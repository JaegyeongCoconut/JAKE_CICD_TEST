export interface InaccessInfo {
  [key: string | number]: {
    path: string[];
    redirectPage: string;
  };
}
