import React, { createContext, useReducer, useState } from "react";
import appReducer from "../reducer";
import { fetchRequest } from "../fetch";
import { toast } from "react-hot-toast";

const models = {};

const baseURL = `http://10.150.10.47:8875/api/`;

export const GlobalContext = createContext();
const initialState = {
  islogin: Boolean(JSON.parse(localStorage.getItem("token"))),
};

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [islogin, setlogin] = useState(initialState.islogin);
  const [decodedToken, setDecodedToken] = useState(null);

  const login = () => {
    setlogin(true);
  };
  const showToast = (message, options = {}) => {
    toast(message, {
      duration: 6000,
      position: "bottom-right",
      ...options,
    });
  };
  const logout = () => {
    console.log("logout is called");
    localStorage.removeItem("token");
    setlogin(false);
    console.log("Token removed from local storage");
  };
  const addmodel = ({ model }) => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };

  const request = async ({
    url,
    model,
    body,
    method = "GET",
    token,
    isfile,
  }) => {
    try {
      token = token || localStorage.getItem("token");

      if (isfile && body) {
        let formData = new FormData();
        Object.keys(body).map((keyname) => {
          formData.append(keyname, body[keyname]);
        });
        body = formData;
      }
      if (model) {
        addmodel({ model: model });
      }
      const res = await fetchRequest({
        url: `${baseURL}${url}`,
        method,
        body,
        model: model ? models[model] : null,
        dispatchEvent: dispatch,
        isfile: isfile,
        token: token,
        showToast: showToast,
      });
      return res;
    } catch (error) {
      console.log("%c 🍬 error: ", error);
      showToast("An error occurred during the request.", { role: "error" });
    }
  };
  const setModel = ({ model, res }) =>
    dispatch({ type: "setmodel", model: model, response: res });
  const setRole = (role) => {
    dispatch({ type: "setRole", role: role });
  };
  const getUserRequests = async ({
    url,
    model,
    body,
    method = "POST",
    isfile,
  }) => {
    try {
      if (model) {
        addmodel({ model: model });
      }
      const res = await fetchRequest({
        url: `${baseURL}user/getUserRequests`,
        method: "GET",
        body,
        model: model ? models[model] : null,
        dispatchEvent: dispatch,
      });
      return res;
    } catch (error) {
      console.log("%c 🍬 error: ", error);
    }
  };

  return (
    <React.Fragment>
      <GlobalContext.Provider
        {...props}
        value={{
          ...state,
          request,
          getUserRequests,
          setModel,
          setRole,
          setlogin,
          login,
          logout,
          islogin,
          decodedToken,
          setDecodedToken,
          showToast,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </React.Fragment>
  );
};
