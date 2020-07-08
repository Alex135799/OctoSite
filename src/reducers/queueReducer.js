import initialState from './initialState';
import {copyQueue} from '../common/copy_objects/copyQueue'
import {ADD_SESSION, ADD_SESSION_ERROR} from '../actions/actionTypes';

export function queue(state = initialState, action) {
  let initialStateQueueCopy = copyQueue(initialState.queue);

  switch (action.type) {
    case ADD_SESSION:
      initialStateQueueCopy.session = action.session;
      break;
    case ADD_SESSION_ERROR:
      initialStateQueueCopy.session.error = action.error;
      break;
    default:
      break;
  }

  return initialStateQueueCopy;
}
