import React from "react";

import CommonPublicRoute from "@repo/components/route/public";

import { PATH } from "~constants";
import { useAuth } from "~contexts";

const PublicRoute = () => {
  const { user, initializing } = useAuth();

  if (initializing) return null;

  return (
    <CommonPublicRoute
      hasUser={!!user}
      paddingTop="76px"
      navigatePath={PATH.INSPECTION}
    />
  );
};

export default PublicRoute;
