import React from "react";
const tokenmsg =
  "Уучлаарай таны нэвтрэлтийн хугацаа дууссан байна. Та дахин нэвтрэнэ үү.";

export function request({ url, method, body, isfile, token }) {
  console.log("body: ", body);
  let Authorization = "Bearer " + token;
  console.log("Request:", { url, method, body, isfile, token });

  if (isfile) {
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        // "Content-Type": 'multipart/form-data',
        Authorization: Authorization.replace(/"/g, ""),
      }),
      body: body,
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
      Authorization: Authorization.replace(/"/g, ""),
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
      };
    });
}
const fetchRequest = async ({
  body,
  url,
  method,
  model,
  dispatchEvent,
  notification,
  isfile,
  isservice,
  token,
  showToast,
}) => {
  try {
    if (model) dispatchEvent({ type: model.request });
    const res = await request({
      url,
      method,
      body,
      isfile,
      isservice,
      token,
    });

    if (model) dispatchEvent({ type: model.response, response: res });
    console.log("Response from the server:", res);

    if (!res.success) {
      showToast(res.value || "Request failed!", {
        icon: "⚠️",
        role: "error",
      });
    }
    return res;
  } catch (error) {
    showToast("An error occurred during the request.", "error");
    return dispatchEvent({
      type: model.error,
      error: error,
    });
  }
};

export { fetchRequest };
