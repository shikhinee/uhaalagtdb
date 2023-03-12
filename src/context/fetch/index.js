import React from "react";
const tokenmsg =
  "Уучлаарай таны нэвтрэлтийн хугацаа дууссан байна. Та дахин нэвтрэнэ үү.";

  export function request({ url, method, body, isfiles, token }) {
    let Authorization = "Bearer " + token;
  
    if (isfiles) {
      return fetch(url, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: Authorization,
        }),
        body,
      })
        .then((res) => ({ ...res, success: res.ok || res.success }))
        .catch((err) => {
          return {
            success: false,
            message: `Хүсэлт илгээхэд алдаа гарлаа`,
            body: body,
            method: method,
          };
        });
    }
  
    return fetch(url, {
      method,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json, text/plain, */*",
        Authorization: Authorization,
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 401) {
          return {
            ...res,
            success: true,
            response: [],
          };
        }
  
        return res.json();
      })
      .catch((err) => {
        return {
          success: false,
          message: `Хүсэлт илгээхэд алдаа гарлаа`,
        };
      });
  }
  const fetchRequest = async({
    body,
    url,
    method,
    model,
    dispatchEvent,
    notification,
    isfile,
    isservice,
    token,
  }) => {
    try {
      if (model) dispatchEvent({ type: model.request });
      const res = await request({ url, method, body, isfile, isservice, token });
  
      if (model) dispatchEvent({ type: model.response, response: res });
      return res;
    } catch (error) {
      return dispatchEvent({
        type: model.error,
        error: error,
      });
    }
  };

export { fetchRequest };
