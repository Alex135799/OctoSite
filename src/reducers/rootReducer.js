import {combineReducers} from 'redux';
import winMessages from './winMessagesReducer';

const rootReducer = combineReducers({
  winMessages
});

export default rootReducer;
