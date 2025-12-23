import { cloneDeep } from "lodash-es";
import type { IValidation } from "typia";

import { apiDebug } from "@repo/stores/apiDebug";
import type { RecursiveUndefined } from "@repo/types";

const isNumericKey = (key: string): boolean => /^\d+$/.test(key);

interface SetDeepValueType {
  value: any;
  object: Record<string, any>;
  path: string;
}

const setDeepValue = ({ object, path, value }: SetDeepValueType): void => {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current = object;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const keyAsIndex = isNumericKey(key) ? +key : key;

    if (isLast) {
      current[keyAsIndex] = value;
      return;
    }

    const nextKey = keys[index + 1];
    const isArray = isNumericKey(nextKey);

    if (
      current[keyAsIndex] === undefined ||
      current[keyAsIndex] === null ||
      typeof current[keyAsIndex] !== "object"
    ) {
      current[keyAsIndex] = isArray ? [] : {};
    }

    current = current[keyAsIndex];
  });
};

interface SanitizeTypiaErrorsProps<T> {
  data: T;
  errors: IValidation.IError[];
  path: string;
}

export const sanitizeTypiaErrors = <T>({
  data,
  errors,
  path,
}: SanitizeTypiaErrorsProps<T>): RecursiveUndefined<T> => {
  const cloned = cloneDeep<T>(data) as object;

  if (
    import.meta.env.VITE_USE_TYPIA_ALERT &&
    process.env.NODE_ENV === "production"
  ) {
    const errorTable = errors.map((error) => ({
      path: error.path.replace("$input.", ""),
      type: error.expected,
      value: error.value,
    }));

    alert(
      `WHERE: GET ${path}\n\nmessage: \n${errorTable
        .map(
          ({ path, type, value }, i) =>
            `${i + 1}. key: ${path} | expected type: ${type} | response value: ${value}`,
        )
        .join("\n")}`,
    );
  }

  for (const error of errors) {
    const path = error.path.slice("$input.".length);

    setDeepValue({ object: cloned, path, value: undefined });
  }

  return cloned as RecursiveUndefined<T>;
};

export const clearTypiaLog = (path: string): void => {
  process.env.NODE_ENV === "development" &&
    apiDebug.getState().onClearLog(path);
};

interface SetTypiaLogProps {
  errors: IValidation.IError[];
  path: string;
}
export const setTypiaLog = ({ path, errors }: SetTypiaLogProps): void => {
  process.env.NODE_ENV === "development" &&
    apiDebug.getState().onSetLog({ path, errors });
};
