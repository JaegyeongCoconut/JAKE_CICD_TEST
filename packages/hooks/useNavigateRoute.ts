import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { clearNavigate, setNavigate } from "@repo/utils/navigateService";

const useNavigateRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);

    return () => {
      clearNavigate();
    };
  }, [navigate]);
};

export default useNavigateRoute;
