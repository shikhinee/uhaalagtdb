import React from "react";

export default function appReducer(state, action) {
  const type = action.type.split("_")[0];
  const model = action.type.split("_")[1];
  switch (type) {
    case "request": {
      state[`is${model}`] = true;
      // state[`res${model}`] = [];
      return { ...state };
    }

    case "error": {
      state[action.type] = action.error;
      state[`err_${model}`] = false;
      return { ...state };
    }
    case "setRole": {
      return {
        ...state,
        role: action.role,
      };
    }
    case "response": {
      state[`res${model}`] = action.response.value
        ? action.response.value
        : action.response.data;
      state[`is${model}`] = false;
      return { ...state };
    }
    case "login":
      return { ...state, islogin: action.response };
    case "update": {
      return {
        ...state,
        update: action.response,
      };
    }
    case "setmodel": {
      state[`res${action.model}`] = action.response;
      return { ...state };
    }
    case "phoneno": {
      return {
        ...state,
        phoneno: action.response,
      };
    }
    default:
      return state;
  }
}
