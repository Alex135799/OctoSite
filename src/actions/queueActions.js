import * as types from "./actionTypes";
export function addSession(session) {
  return { type: types.ADD_SESSION, session: session };
}

export function removeSession() {
  return { type: types.REMOVE_SESSION };
}

export function addToQueue(data) {
  return { type: types.ADD_TO_QUEUE, list: data };
}

export function loadIn(numToLoadIn, queueList) {
  return { type: types.LOAD_IN, numToLoadIn: numToLoadIn, list: queueList };
}

export function bringBack(toBringBack, queueList) {
  return { type: types.BRING_BACK, toBringBack: toBringBack, list: queueList };
}

export function addSessionError(error) {
  return { type: types.ADD_SESSION_ERROR, error: error };
}