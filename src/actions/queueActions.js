import * as types from "./actionTypes";
export function addSession(session) {
  return { type: types.ADD_SESSION, session: session };
}
  
export function addSessionError(error) {
  return { type: types.ADD_SESSION_ERROR, error: error };
}