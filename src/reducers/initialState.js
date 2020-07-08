import {queueSessionLoadingString} from "../common/constants/stringConstants"

export default {
  winMessages: {
    winMessage: 'Gattcha Sim. Press the big rotating atom to pull.',
    winType: null,
    pullSummary: {
      totalWins: 0,
      totalPulls: 0
    }
  },
  queue: {
    session: {},
    list: [
      {
        name: queueSessionLoadingString
      }
    ]
  },
  calendar: {
    form: {
      event: {
        start: "00:00",
        end: "00:00"
      }
    }
  },
  user: {
    loggedIn: false
  }
};
