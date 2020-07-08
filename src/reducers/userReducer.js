import initialState from './initialState';
import { copyUser } from '../common/copy_objects/copyUser'
import { LOGIN } from '../actions/actionTypes';
import { userCookieName } from "../common/constants/stringConstants";
import jwt_decode from "jwt-decode";
import Cookie from "universal-cookie";

export function user(state = initialState, action) {
  let stateUserCopy = copyUser(state.user);
  let cookie = new Cookie();

  switch (action.type) {
    case LOGIN:
      let accessInfo = jwt_decode(action.accessToken);
      let idInfo = jwt_decode(action.idToken);
      let loginUser = { loggedIn: true, accessInfo: accessInfo, idInfo: idInfo }
      let jwtCookie = { accessToken: action.accessToken, idToken: action.idToken };
      cookie.set(userCookieName, jwtCookie, {path: '/', expires: new Date(idInfo.exp * 1000)});
      stateUserCopy = loginUser;
      break;
    default:
      if (!state.user.loggedIn) {
        let userCookie = cookie.get(userCookieName);
        if (userCookie) {
          let accessInfo = jwt_decode(userCookie.accessToken);
          let idInfo = jwt_decode(userCookie.idToken);
          stateUserCopy = { loggedIn: true, accessInfo: accessInfo, idInfo: idInfo }
        }
      }
      break;
  }

  return stateUserCopy;
}
