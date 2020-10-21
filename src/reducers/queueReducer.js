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
    case types.LEAVE_SESSION:
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
    case types.REMOVE_FROM_QUEUE:
      for (var actionInd=0; actionInd<action.list.length; actionInd++) {
        for (var stateQueueInd=0; stateQueueInd<stateQueueCopy.list.length; stateQueueInd++) {
          let queueEntry = stateQueueCopy.list[stateQueueInd];
          let actionEntry = action.list[actionInd];
          if (actionEntry.createdAt === queueEntry.createdAt) {
            stateQueueCopy.list.splice(stateQueueInd, 1);
          }
        }
      }
      stateQueueCopy.session.error = null;
      break;
    case types.REPLACE_QUEUE:
      stateQueueCopy.list = [];
      stateQueueCopy.inactiveList = [];
      for (var ii = 0; ii < action.list.length; ii++) {
        let item = action.list[ii];
        if (item.active === "true") {
          stateQueueCopy.list.push(item);
        }
        else {
          stateQueueCopy.inactiveList.push(item);
        }
      }
      stateQueueCopy.session.error = null;
      break;
    case types.ADD_SESSION_OPTIONS:
      stateQueueCopy.sessionOptions = action.list;
      stateQueueCopy.session.error = null;
      break;
    case types.MOVE_ENTRY:
      if (action.activeStatus === "true") {
        let broughtBack = action.entry;
        action.inactiveList.splice(action.entryIndex, 1);
        action.list.unshift(broughtBack);
        stateQueueCopy.list = action.list;
        stateQueueCopy.inactiveList = action.inactiveList;
      }
      else if (action.activeStatus === "false") {
        let loadedIn = action.entry;
        action.inactiveList.push(loadedIn);
        action.list.splice(action.entryIndex, 1);
        stateQueueCopy.list = action.list;
        stateQueueCopy.inactiveList = action.inactiveList;
      }
      stateQueueCopy.session.error = null;
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
