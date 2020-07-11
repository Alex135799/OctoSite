import initialState from './initialState';
import copyWinMessages from '../common/copyWinMessages'
import {UPDATE_WIN_MESSAGE, RESET_WIN_MESSAGE} from '../actions/actionTypes';

export default function winMessages(state = initialState, action) {
  let winMessagesInitialState = copyWinMessages(initialState.winMessages);
  let initialStateCopy = Object.assign({}, initialState);
  initialStateCopy.winMessages = winMessagesInitialState;

  switch (action.type) {
    case UPDATE_WIN_MESSAGE:
      return action.winMessages;
    case RESET_WIN_MESSAGE:
      return initialStateCopy.winMessages;
    default:
      return initialStateCopy.winMessages;
  }
}
