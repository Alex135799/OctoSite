import * as types from './actionTypes';

const randomMax = 1000;

function rand(randomMaxVal) {
  return Math.floor(Math.random() * randomMaxVal);
}

function getWinMessage(randomNumber, pullSummary) {
  let winMessage = 'Undefined win message';
  if (randomNumber < 5) {
    winMessage = '7 Star EX!!! Congratulations!!!';
    pullSummary.totalWins = pullSummary.totalWins + 1;
  }
  else if (randomNumber < 20) {
    winMessage = '7 Star 8 Tier, not completely useless... Subslots are nice...';
  }
  else if (randomNumber < 100) {
    winMessage = '6 Star 8 Tier, could possibly be ok with a lot of investment...';
  }
  else {
    winMessage = 'Garbage! Pull again Dummy!';
  }
  return winMessage;
}

export function updateWinMessages(pullSummary) {
  let winMessage = 'Undefined win message';
  let randomNumber = rand(randomMax);
  pullSummary.totalPulls = pullSummary.totalPulls + 1;
  winMessage = getWinMessage(randomNumber, pullSummary);
  let winMessages = {
    winMessage: winMessage,
    pullSummary: pullSummary
  }
  return {type: types.UPDATE_WIN_MESSAGE, winMessages: winMessages};
}

export function resetWinMessages() {
  return {type: types.RESET_WIN_MESSAGE};
}
