import React from "react";

import CommonPublicRoute from "@repo/components/route/public";

import { PATH } from "~constants";
import { useAuthStore } from "~stores";

const PublicRoute = () => {
  const user = useAuthStore.getState().user;

  return (
    <CommonPublicRoute
      hasUser={!!user}
      forceLaoLanguage={false}
      navigatePath={PATH.INSPECTION}
    />
  );
};

export default PublicRoute;
