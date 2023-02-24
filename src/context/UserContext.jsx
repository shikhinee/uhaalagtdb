import { createContext, useContext, useState, useEffect } from "react";
import { ApiContext } from "./ApiContext";
import jwt_decode from "jwt-decode";

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
      localStorage.setItem("token", data.value); // Save the token in local storage
      return await searchUser(data.value); // Call searchUser only after user has logged in
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const searchUser = async (token) => {
    try {
      const decodedToken = jwt_decode(token);
      const username = decodedToken.username;
      const data = await makeRequest(
        `user/searchUser?username=${username}`,
        "GET"
      );
      setUser(data.value);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      searchUser(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
