export default function copyWinMessages(winMessages) {
  let winMessagesState = Object.assign({}, winMessages);
  winMessagesState.pullSummary = Object.assign({}, winMessages.pullSummary);

  return winMessagesState;
}
