import { v4 as uuidv4 } from "uuid";

import usePreventDuplicateMutation from "@repo/hooks/usePreventDuplicateMutation";
import { navigateByRef } from "@repo/utils/navigateService";
import pathStorage from "@repo/utils/pathStorage";

import { loginAPI, logoutAPI } from "~apis";
import { PATH } from "~constants";
import { useAuthStore } from "~stores";
import type { ApiErrorType, LoginQueryModel, LoginServerModel } from "~types";

export const useLogin = () => {
  const signIn = useAuthStore((state) => state.signIn);

  return usePreventDuplicateMutation<
    LoginServerModel,
    ApiErrorType,
    LoginQueryModel
  >({
    mutationKey: [uuidv4()],
    mutationFn: loginAPI,
    options: {
      onSuccess: (res) => {
        const redirectPage = pathStorage.getPath(PATH.INSPECTION); // TODO: 추후 PATH 수정 필요

        signIn(res);
        navigateByRef(redirectPage);
      },
    },
  });
};

export const useLogout = () => {
  const signOut = useAuthStore((state) => state.signOut);

  return usePreventDuplicateMutation<unknown, ApiErrorType, void>({
    mutationKey: [uuidv4()],
    mutationFn: logoutAPI,
    options: {
      onSuccess: () => {
        pathStorage.setPath(PATH.INSPECTION);
        signOut();
        navigateByRef("/");
      },
    },
  });
};
