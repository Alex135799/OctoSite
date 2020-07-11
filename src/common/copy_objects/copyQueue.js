export function copyQueue(queue) {
  let queueCopy = Object.assign({}, queue);
  let sessionCopy = copySession(queue.session);
  queueCopy.session = sessionCopy;

  return queueCopy;
}

export function copySession(session) {
  let sessionCopy = Object.assign({}, session);

  return sessionCopy;
}