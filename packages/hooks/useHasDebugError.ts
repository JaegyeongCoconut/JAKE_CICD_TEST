import { useApiDebugStore } from "@repo/stores/apiDebug";

const useHasDebugError = () => {
  if (process.env.NODE_ENV !== "development") return false;

  const hasError = useApiDebugStore((state) => state.onGetHasError());

  return hasError;
};

export default useHasDebugError;
