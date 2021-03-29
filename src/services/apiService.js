const API_URL = "http://localhost:8000";
const KEY_TOKEN = "token";

export async function postData(url = "", data = {}) {
  const response = await fetch(API_URL + url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getDataAuth(url = "") {
  const response = await fetch(API_URL + url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem(KEY_TOKEN),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

export async function postDataAuth(url = "", data = {}) {
  return apiInteractionAuth(url, data, "POST");
}

export async function putDataAuth(url = "", data = {}) {
  return apiInteractionAuth(url, data, "PUT");
}

export async function patchDataAuth(url = "", data = {}) {
  return apiInteractionAuth(url, data, "PATCH");
}

export async function deleteDataAuth(url = "", data = {}) {
  return apiInteractionAuth(url, data, "DELETE");
}

async function apiInteractionAuth(url = "", data = {}, method = "POST") {
  const response = await fetch(API_URL + url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem(KEY_TOKEN),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
