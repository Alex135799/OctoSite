import initialState from './initialState';
import {UPDATE_WIN_MESSAGE, RESET_WIN_MESSAGE} from '../actions/actionTypes';

function copyWinMessages(winMessages) {
  let initWinMessagesState = winMessages;
  let winMessagesState = Object.assign({}, initWinMessagesState);
  winMessagesState.pullSummary = Object.assign({}, initWinMessagesState.pullSummary);

  return winMessagesState;
}

export default function winMessages(state = initialState, action) {
  if (state.winMessages == null) {
    let oldState = copyWinMessages(state);
    state = {};
    state.winMessages = oldState;
  }

  let winMessagesState = copyWinMessages(state.winMessages);

  let newState = Object.assign({}, state);
  newState.winMessages = winMessagesState;

  switch (action.type) {
    case UPDATE_WIN_MESSAGE:
      return action.winMessages;
    case RESET_WIN_MESSAGE:
      return newState.winMessages;
    default:
      return newState.winMessages;
  }
}
