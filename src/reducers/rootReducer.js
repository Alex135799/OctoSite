import {combineReducers} from 'redux';
import winMessages from './winMessagesReducer';
import {queue} from './queueReducer';
import {user} from './userReducer';
import {calendar, calendar_event_form} from './calendarReducer';

const rootReducer = combineReducers({
  winMessages, calendar, calendar_event_form, queue, user
});

export default rootReducer;
