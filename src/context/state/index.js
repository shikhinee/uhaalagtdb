import React, { createContext, useReducer, useState } from "react";
import appReducer from "../reducer";
import { Snackbar } from "@mui/material";
import { fetchRequest } from "../fetch";
import Alert from "@mui/material/Alert";

const models = {};

const baseURL = `http://10.150.10.47:8875/api/`;

export const GlobalContext = createContext();
const initialState = {
  islogin: Boolean(JSON.parse(localStorage.getItem("token"))),
  alert: {
    open: false,
    message: "",
    severity: "success",
  },
};

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [islogin, setlogin] = useState(initialState.islogin);
  const [decodedToken, setDecodedToken] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };
  const login = () => {
    setlogin(true);
  };
  const showAlert = (message, severity) => {
    dispatch({ type: "SET_ALERT", payload: { message, severity } });
    setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
    }, 3000);
  };
  const logout = () => {
    setlogin(false);
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
        showAlert,
      });
      if (res.success) {
        showAlert("Request successful!", "success");
      } else {
        showAlert(res.message || "Request failed!", "error");
      }

      return res;
    } catch (error) {
      console.log("%c 🍬 error: ", error);
      showAlert("An error occurred during the request.", "error");
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
        // isfile: isfile,
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
          showAlert,
          decodedToken,
          setDecodedToken,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </React.Fragment>
  );
};
