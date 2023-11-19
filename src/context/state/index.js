import React, { createContext, useReducer, useState, useEffect } from "react";
import appReducer from "../reducer";
import { fetchRequest } from "../fetch";
import { toast } from "react-hot-toast";
import TokenExpiredModal from "components/TokenExpiredModal";

const models = {};

<<<<<<< Updated upstream
// const baseURL = `https://bcard.tdbm.mn/api/`;

const baseURL = `http://localhost:8875/api/`;
=======
const baseURL = `http://bcard.tdbmlabs.mn:8042/api/`;
>>>>>>> Stashed changes

export const GlobalContext = createContext();
const initialState = {
  islogin: Boolean(JSON.parse(localStorage.getItem("token"))),
};

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [islogin, setlogin] = useState(initialState.islogin);
  const [decodedToken, setDecodedToken] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenExpiredModalOpen, setTokenExpiredModalOpen] = useState(false);

  // useEffect(() => {
  //   const tokenValidityInterval = setInterval(() => {
  //     checkTokenValidity();
  //   }, 3000); // Check every minute (60000 milliseconds)

  //   return () => {
  //     clearInterval(tokenValidityInterval);
  //   };
  // }, [islogin]);

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
    localStorage.removeItem("token");
    setlogin(false);
  };

  const addmodel = ({ model }) => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };

  const checkTokenValidity = async () => {
    if (islogin) {
      try {
        const response = await request({
          url: "checkToken",
          checkToken: false,
        });
        if (!response.success) {
          logout();
          setTokenExpiredModalOpen(true);
        }
      } catch (error) {
        console.log("Error checking token validity:", error);
      }
    }
  };

  const request = async ({
    url,
    model,
    body,
    method = "GET",
    token,
    checkToken = true,
    isfile,
  }) => {
    try {
      if (islogin && checkToken) checkTokenValidity();

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
      showToast("Сервэрт алдаа гарлаа", { role: "error" });
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
          tokenLoading,
          setTokenLoading,
        }}
      >
        {props.children}
        <TokenExpiredModal
          open={tokenExpiredModalOpen}
          onModalClose={() => setTokenExpiredModalOpen(false)}
        />
      </GlobalContext.Provider>
    </React.Fragment>
  );
};
