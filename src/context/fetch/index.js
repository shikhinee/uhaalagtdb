import React from "react";
const tokenmsg =
  "Уучлаарай таны нэвтрэлтийн хугацаа дууссан байна. Та дахин нэвтрэнэ үү.";

export const _request = async ({ url, method, body, isfile, isservice }) => {
  const token = "";
  const errorSms = {
    message: "Алдаа",
    success: false,
    data: [],
  };
  let Authorization = "Bearer " + token;
  if (method === "GET") {
    return fetch(url, {
      method: "GET",
      /*  mode: "no-cors", */
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: Authorization,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 401) {
          errorSms.status = res.status;
          errorSms.message = tokenmsg;
          return errorSms;
        }

        return res;
      })
      .catch((error) => {
        errorSms.message = error.message;
        return errorSms;
      });
  }

  if (isfile) {
    const request = new Request(url, {
      method,
      headers: new Headers({ Authorization: Authorization }),
      body,
    });
    return fetch(request)
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 401) {
          errorSms.status = res.status;
          errorSms.message = tokenmsg;
          return errorSms;
        }

        return res;
      })
      .catch((error) => {
        errorSms.message = error.message;
        return errorSms;
      });
  }
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json, text/plain, */*",
      Authorization: Authorization,
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      else if (res.status === 401) {
        errorSms.status = res.status;
        errorSms.message = tokenmsg;
        return errorSms;
      }

      return res;
    })
    .catch((error) => {
      if (error.message.includes("Failed to fetch") && isservice)
        errorSms.message = "Service тэй холбогдож чадсангүй.";
      else errorSms.message = error.message;

      return errorSms;
    });
};

const fetchRequest = async ({
  body,
  url,
  method,
  model,
  dispatchEvent,
  notification,
  isfile,
  isservice,
}) => {
  try {
    if (model) dispatchEvent({ type: model.request });
    const res = await _request({ url, method, body, isfile, isservice });

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
