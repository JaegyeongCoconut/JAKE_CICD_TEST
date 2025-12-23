import { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import createAuthStore from "@repo/stores/auth";

import type { LoginServerModel } from "~types";

const useAuthStore = createAuthStore<LoginServerModel>({
  cookieKey: SERVICE_INFO.CAR_INSPECTION.cookieKey,
});

export default useAuthStore;
