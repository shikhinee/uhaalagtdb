import React, { createContext, useReducer } from "react";
import appReducer from "../reducer";
import { fetchRequest } from "../fetch";

const models = {};

const baseURL = `http://10.150.10.47:8875/api/`;

export const GlobalContext = createContext();
const initialState = {};

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addmodel = ({ model }) => {
    models[model] = {
      request: `request_${model}`,
      response: `response_${model}`,
      error: `error_${model}`,
    };
  };

  const request = async ({ url, model, body, method = "GET", token, isfile }) => {
    try {
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
      });
      console.log("token", token);
      /* notification: notification, */
      return res;
    } catch (error) {
      console.log("%c 🍬 error: ", error);
    }
  };

  const setlogin = (islogin) =>
    dispatch({ type: "login", response: islogin });
    const setModel = ({ model, res }) =>
    dispatch({ type: "setmodel", model: model, response: res });
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
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </React.Fragment>
  );
};
