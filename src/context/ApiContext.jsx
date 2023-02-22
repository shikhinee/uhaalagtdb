import React, { createContext } from "react";

// Define your API base URL
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Define your headers
const headers = {
  "Content-Type": "application/json",
  authorization: localStorage.getItem("token"),
};

// Define a reusable function to make API requests
const makeRequest = async (url, method = "GET", data = null) => {
  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${baseUrl}/${url}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};

// Create the context
export const ApiContext = createContext({
  makeRequest: makeRequest,
  baseUrl: baseUrl,
});

// Define the provider component
const ApiContextProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ makeRequest, baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

// Define a function to register a user
const registerUser = async (username, password) => {
  // Generate an 8-digit user ID
  const userId = Math.floor(Math.random() * 100000000);

  // Define the user data
  const userData = {
    userID: userId,
    username: username,
    password: password,
    role: "user",
    branchID: 0,
    userStatus: "Requested",
    depID: 0,
  };

  // Make the register user request
  const response = await makeRequest("user/register", "POST", userData);

  return response;
};

export { registerUser, ApiContextProvider };
