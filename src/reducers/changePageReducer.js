import initialState from './initialState';
import {CHANGE_PAGE} from '../actions/actionTypes';

export default function changePage(state = initialState.currentPage, action) {
  let newState;
  switch (action.type) {
    case CHANGE_PAGE:
      newState = action.currentPage;
      return newState;
    default:
      return state;
  }
}
