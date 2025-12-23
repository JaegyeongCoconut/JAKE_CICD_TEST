import React from "react";

import CommonPrivateRoute from "@repo/components/route/private";

import { useAuthStore } from "~stores";

const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <CommonPrivateRoute
      hasUser={!!user}
      isAccessiblePage={false}
      navigatePath=""
    />
  );
};

export default PrivateRoute;
