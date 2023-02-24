import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (username, password) => {
    setIsLoading(true);
    setError(null);
    const userId = Math.floor(10000000 + Math.random() * 90000000);
    const userData = {
      userID: userId,
      username: username,
      password: password,
      role: "user",
      branchID: "0",
      userStatus: "Requested",
      depID: "0",
    };
    const response = await fetch(`${baseUrl}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      // localStorage.setItem("token", JSON.stringify(json.value));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
