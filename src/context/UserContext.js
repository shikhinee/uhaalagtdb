import { createContext, useContext, useState } from "react";
import { ApiContext } from "./ApiContext";

// Create the context
export const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async (username, password) => {},
  logout: () => {},
});

// Define the provider component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { makeRequest } = useContext(ApiContext);

  const login = async (username, password) => {
    try {
      const data = await makeRequest("login", "POST", { username, password });
      setUser(data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
