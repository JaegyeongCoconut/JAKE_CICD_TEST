import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { useRoutePath } from "@repo/contexts/RoutePathProvider";
import usePreventDuplicateMutation from "@repo/hooks/usePreventDuplicateMutation";
import type { RecursiveUndefined } from "@repo/types";

import { loginAPI, logoutAPI } from "~apis";
import { PATH } from "~constants";
import { useAuth } from "~contexts";
import type { ApiErrorType, LoginQueryModel, LoginServerModel } from "~types";

export const useLogin = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { redirectPathStorage } = useRoutePath();

  return usePreventDuplicateMutation<
    RecursiveUndefined<LoginServerModel>,
    ApiErrorType,
    LoginQueryModel
  >({
    mutationKey: [uuidv4()],
    mutationFn: loginAPI,
    options: {
      onSuccess: (res) => {
        if (!res || !res.accessToken || !res.refreshToken)
          return navigate(PATH.ROOT);

        const { accessToken, refreshToken } = res;

        // TODO: 추후 PATH 수정 필요
        const redirectPage = redirectPathStorage.getPath(PATH.INSPECTION);

        auth.signIn({ accessToken, refreshToken });

        navigate(redirectPage);
      },
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { redirectPathStorage } = useRoutePath();

  return usePreventDuplicateMutation<unknown, ApiErrorType, void>({
    mutationKey: [uuidv4()],
    mutationFn: logoutAPI,
    options: {
      onSuccess: () => {
        redirectPathStorage.setPath(PATH.INSPECTION);
        auth.onSignOut();
        navigate("/");
      },
    },
  });
};
