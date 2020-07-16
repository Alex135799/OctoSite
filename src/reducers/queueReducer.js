import initialState from './initialState';
import { copyQueue } from '../common/copy_objects/copyQueue'
import * as types from '../actions/actionTypes';
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
    case types.ADD_SESSION:
      stateQueueCopy.session = action.session;
      stateQueueCopy.session.error = null;
      cookie.set(queueSessionCookieName, action.session, { path: '/' });
      break;
    case types.REMOVE_SESSION:
      stateQueueCopy = initialState.queue;
      cookie.remove(queueSessionCookieName);
      stateQueueCopy.session.error = null;
      break;
    case types.ADD_SESSION_ERROR:
      stateQueueCopy.session.error = action.error;
      break;
    case types.ADD_TO_QUEUE:
      for (var i=0; i<action.list.length; i++) {
        stateQueueCopy.list.push(action.list[i]);
      }
      stateQueueCopy.session.error = null;
      break;
    case types.REPLACE_QUEUE:
      stateQueueCopy.list = action.list;
      stateQueueCopy.session.error = null;
      break;
    case types.ADD_SESSION_OPTIONS:
      stateQueueCopy.sessionOptions = action.list;
      stateQueueCopy.session.error = null;
      break;
    case types.LOAD_IN:
      for (var j = 0; j < action.numToLoadIn; j++) {
        action.list.shift();
      }
      stateQueueCopy.session.error = null;
      stateQueueCopy.list = action.list;
      break;
    case types.BRING_BACK:
      for (var k = 0; k < action.toBringBack.length; k++) {
        action.list.unshift(action.toBringBack[k]);
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
