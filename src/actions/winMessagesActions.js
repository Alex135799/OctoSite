import * as types from './actionTypes';
import * as winTypes from '../common/winTypes';

const randomMax = 1000;

function rand(randomMaxVal) {
  return Math.floor(Math.random() * randomMaxVal);
}

function getWinMessage(randomNumber, pullSummary) {
  let winMessage = 'Undefined win message';
  let winType = null;
  if (randomNumber < 10) {
    winMessage = '5 Stars Congratulations!!!';
    winType = winTypes.FIVE_STARS;
    pullSummary.totalWins = pullSummary.totalWins + 1;
  }
  else if (randomNumber < 100) {
    winMessage = '4 Stars, not completely useless...';
    winType = winTypes.FOUR_STARS;
  }
  else if (randomNumber < 350) {
    winMessage = '3 Stars, it\'s ok I guess...';
    winType = winTypes.THREE_STARS;
  }
  else if (randomNumber < 650) {
    winMessage = '2 Stars, better than 1...';
    winType = winTypes.TWO_STARS;
  }
  else {
    winMessage = 'Garbage!';
    winType = winTypes.ONE_STAR;
  }
  return {"winMessage": winMessage, "winType": winType};
}

export function updateWinMessages(pullSummary) {
  let winMessage = 'Undefined win message';
  let winType = null;
  let randomNumber = rand(randomMax);
  pullSummary.totalPulls = pullSummary.totalPulls + 1;
  let win = getWinMessage(randomNumber, pullSummary);
  winMessage = win.winMessage;
  winType = win.winType;
  let winMessages = {
    winMessage: winMessage,
    winType: winType,
    pullSummary: pullSummary
  }
  return {type: types.UPDATE_WIN_MESSAGE, winMessages: winMessages};
}

export function resetWinMessages() {
  return {type: types.RESET_WIN_MESSAGE};
}
