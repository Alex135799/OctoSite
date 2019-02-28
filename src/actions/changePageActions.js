import * as types from './actionTypes';

export function changePage(currentPage) {
  return {type: types.CHANGE_PAGE, currentPage: currentPage};
}
