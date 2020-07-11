export function copyUser(user) {
  let userCopy = Object.assign({}, user);

  return userCopy;
}
