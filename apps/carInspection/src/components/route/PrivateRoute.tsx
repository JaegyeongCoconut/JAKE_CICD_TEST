import React from "react";

import CommonPrivateRoute from "@repo/components/route/private";

import { useAuth } from "~contexts";

const PrivateRoute = () => {
  const { user, initializing } = useAuth();

  return (
    <CommonPrivateRoute
      hasUser={!!user}
      isAccessiblePage={false}
      initializing={initializing}
      navigatePath=""
    />
  );
};

export default PrivateRoute;
