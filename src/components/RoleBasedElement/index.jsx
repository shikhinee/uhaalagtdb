import React, { useContext, useEffect } from "react";
import { GlobalContext } from "context/state";
import { useNavigate } from "react-router-dom";

const RoleBasedElement = ({ allowedRoles, children }) => {
  const { role } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      navigate("/login");
    }
  }, [role, allowedRoles, navigate]);

  return role && allowedRoles.includes(role) ? children : null;
};

export default RoleBasedElement;
