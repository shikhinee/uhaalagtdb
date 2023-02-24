import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "context/UserContext";

const ProtectedRoute = ({ children: Component, roles, ...rest }) => {
  const { user } = useUserContext();
  const isAuthenticated = user !== null;
  const userRole = user?.role;
  console.log(user);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(userRole) === -1) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} children={<Component />} />;
};

export default ProtectedRoute;
