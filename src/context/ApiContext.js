import React, { createContext } from "react";

// Define your API base URL
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Define your headers
const headers = {
  "Content-Type": "application/json",
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
export const ApiContextProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ makeRequest, baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};
export default ApiContextProvider;
