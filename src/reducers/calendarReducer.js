import initialState from './initialState';
import {copyCalendar, copyForm} from '../common/copy_objects/copyCalendar'
import {CALENDAR_ACTION} from '../actions/actionTypes';

export function calendar(state = initialState, action) {
  let initialStateCalendarCopy = copyCalendar(initialState.calendar);

  if (action.type === CALENDAR_ACTION) {
    return initialStateCalendarCopy;
  }
  return initialStateCalendarCopy;
}

export function calendar_event_form(state = initialState, action) {
  let initialStateCalendarFormCopy = copyForm(initialState.calendar.form);
  return initialStateCalendarFormCopy;
}
