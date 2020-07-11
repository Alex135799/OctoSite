import initialState from './initialState';
import { copyQueue } from '../common/copy_objects/copyQueue'
import { ADD_SESSION, ADD_SESSION_ERROR, REMOVE_SESSION, ADD_TO_QUEUE, LOAD_IN, BRING_BACK } from '../actions/actionTypes';
import { queueSessionCookieName } from "../common/constants/stringConstants";
import Cookie from "universal-cookie";

export function queue(state = initialState, action) {
  let stateQueueCopy;
  if (state.queue) {
    stateQueueCopy = copyQueue(state.queue);
  } else {
    stateQueueCopy = copyQueue(state);
  }

  let cookie = new Cookie();

  switch (action.type) {
    case ADD_SESSION:
      stateQueueCopy.session = action.session;
      stateQueueCopy.session.error = null;
      cookie.set(queueSessionCookieName, action.session, { path: '/' });
      break;
    case REMOVE_SESSION:
      stateQueueCopy = initialState.queue;
      cookie.remove(queueSessionCookieName);
      stateQueueCopy.session.error = null;
      break;
    case ADD_SESSION_ERROR:
      stateQueueCopy.session.error = action.error;
      break;
    case ADD_TO_QUEUE:
      stateQueueCopy.list = action.list;
      stateQueueCopy.session.error = null;
      break;
    case LOAD_IN:
      for (var i = 0; i < action.numToLoadIn; i++) {
        action.list.shift();
      }
      stateQueueCopy.session.error = null;
      stateQueueCopy.list = action.list;
      break;
    case BRING_BACK:
      for (var j = 0; j < action.toBringBack.length; j++) {
        action.list.unshift(action.toBringBack[j]);
      }
      stateQueueCopy.list = action.list;
      break;
    default:
      if (!state.queue || !state.queue.session || !state.queue.session.sessionId) {
        let queueSessionCookie = cookie.get(queueSessionCookieName);
        if (queueSessionCookie) {
          stateQueueCopy.session = queueSessionCookie;
        }
      }
      break;
  }

  return stateQueueCopy;
}
