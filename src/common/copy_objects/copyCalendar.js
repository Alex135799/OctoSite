export function copyCalendar(calendar) {
  let calendarCopy = Object.assign({}, calendar);
  calendarCopy.form = Object.assign({}, calendar.form);
  calendarCopy.form.event = Object.assign({}, calendar.form.event);

  return calendarCopy;
}

export function copyForm(form) {
  let formCopy = Object.assign({}, form);
  formCopy.event = Object.assign({}, form.event);

  return formCopy;
}
