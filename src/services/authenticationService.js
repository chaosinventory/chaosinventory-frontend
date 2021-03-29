import { getDataAuth, postData, postDataAuth } from "./apiService";

export const authenticationService = {
  login,
  getTokens,
  loggedIn,
  logout,
};

const KEY_TOKEN = "token";

function login(username, password) {
  postData("/api/authentication/token/credentials", {
    username: username,
    password: password,
    application: "chaosinventory",
  }).then((data) => {
    localStorage.setItem(KEY_TOKEN, data.token);
  });
}

function loggedIn() {
  return localStorage.getItem(KEY_TOKEN) != null;
}

function renewToken() {}

function getTokens() {
  getDataAuth("/api/authentication/token").then((data) => {
    console.log(data);
  });
}

function logout() {
  localStorage.removeItem(KEY_TOKEN);
}
