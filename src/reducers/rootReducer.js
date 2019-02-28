import {combineReducers} from 'redux';
import winMessages from './winMessagesReducer';
import changePage from './changePageReducer';

const rootReducer = combineReducers({
  winMessages,
  changePage
});

export default rootReducer;
