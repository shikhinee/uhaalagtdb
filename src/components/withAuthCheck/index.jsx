import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

const withAuthCheck = (Component, redirectTo) => {
  const WithAuthCheck = (props) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated()) {
        navigate(redirectTo);
      }
    }, [isAuthenticated, navigate, redirectTo]);

    return <Component {...props} />;
  };

  return WithAuthCheck;
};

export default withAuthCheck;
