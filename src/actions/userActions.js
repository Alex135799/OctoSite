import * as types from "./actionTypes";

export function login(idToken, accessToken) {
  return {type: types.LOGIN, idToken: idToken, accessToken: accessToken};
}

export function logout() {
  return {type: types.LOGOUT}
}