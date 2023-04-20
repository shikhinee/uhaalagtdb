import { useContext } from "react";
import { GlobalContext } from "context/state";
import { Navigate } from "react-router-dom";

const RoleBasedElement = ({ allowedRoles, children }) => {
  const { decodedToken, tokenLoading } = useContext(GlobalContext);
  if (tokenLoading || !decodedToken) {
    return null;
  }
  return allowedRoles.includes(decodedToken.userStatus) ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RoleBasedElement;
