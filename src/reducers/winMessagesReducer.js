import initialState from './initialState';
import {UPDATE_WIN_MESSAGE, RESET_WIN_MESSAGE} from '../actions/actionTypes';

export default function winMessages(state = initialState.winMessages, action) {
  let newState;
  switch (action.type) {
    case UPDATE_WIN_MESSAGE:
      newState = action.winMessages;
      return newState;
    case RESET_WIN_MESSAGE:
      return state;
    default:
      return state;
  }
}
