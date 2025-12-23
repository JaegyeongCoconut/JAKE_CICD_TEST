import type { NavigateFunction, To } from "react-router-dom";

let navigateRef: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction): void => {
  navigateRef = navigate;
};

export const clearNavigate = (): void => {
  navigateRef = null;
};

export const navigateByRef = (path: To): void => {
  if (!navigateRef) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("Navigate function is not set.");
    }
    return;
  }

  navigateRef(path);
};
