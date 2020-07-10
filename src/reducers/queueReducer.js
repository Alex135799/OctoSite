import initialState from './initialState';
import {copyQueue} from '../common/copy_objects/copyQueue'
import {ADD_SESSION, ADD_SESSION_ERROR} from '../actions/actionTypes';
import { queueSessionCookieName } from "../common/constants/stringConstants";
import Cookie from "universal-cookie";

export function queue(state = initialState, action) {
  let initialStateQueueCopy = copyQueue(initialState.queue);
  let cookie = new Cookie();

  switch (action.type) {
    case ADD_SESSION:
      initialStateQueueCopy.session = action.session;
      cookie.set(queueSessionCookieName, action.session, {path: '/'});
      break;
    case ADD_SESSION_ERROR:
      initialStateQueueCopy.session.error = action.error;
      break;
    default:
      if (!state.queue || !state.queue.session || !state.queue.session.id) {
        let queueSessionCookie = cookie.get(queueSessionCookieName);
        if (queueSessionCookie) {
          initialStateQueueCopy.session = queueSessionCookie;
        }
      }
      break;
  }

  return initialStateQueueCopy;
}
