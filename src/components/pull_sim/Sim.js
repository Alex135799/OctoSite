import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './Sim.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as winMessagesActions from '../../actions/winMessagesActions';
import PropTypes from 'prop-types';

class Sim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winMessages: this.props.winMessages
    }
  }

  updateWinMessages = event => {
    this.props.winMessagesActions.updateWinMessages(this.state.winMessages.pullSummary);
  }

  resetWinMessages = event => {
    this.props.winMessagesActions.resetWinMessages();
  }

  resetButton() {
    if (this.props.winMessages.pullSummary.totalPulls === 0) {
      return <button onClick={this.resetWinMessages}>Reset the Counters</button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 100) {
      return <button onClick={this.resetWinMessages}>You win! Quit while you still can!</button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 75) {
      return <button onClick={this.resetWinMessages}>Reset the decent Counters</button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 50) {
      return <button onClick={this.resetWinMessages}>Reset the respectable Counters</button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 0) {
      return <button onClick={this.resetWinMessages}>Reset the shameful Counters</button>
    }
    else if (this.props.winMessages.pullSummary.totalPulls > 100) {
      return <button onClick={this.resetWinMessages}>Reset these Counters, they are making me cry</button>
    }
    else if (this.props.winMessages.pullSummary.totalPulls > 1000) {
      return <button onClick={this.resetWinMessages}>Reset these Counters, I can't even see through the tears</button>
    }
    else {
      return <button onClick={this.resetWinMessages}>Reset the Counters</button>
    }
  }

  render() {
    return (
      <div className="Sim">
        <header className="Sim-header">
          <a href="#">
            <img src={logo} className="Sim-logo" alt="logo"
              onClick={this.updateWinMessages} />
          </a>
          <p>
            {state.winMessages.winMessage}
          </p>
          <p>
            Total number of pulls: {state.winMessages.pullSummary.totalPulls}.
            Total number of actual wins: {state.winMessages.pullSummary.totalWins}.
          </p>
          {this.resetButton()}
        </header>
      </div>
    );
  }
}

Sim.PropTypes = {
  winMessageActions: PropTypes.object,
  winMessages: PropTypes.object
}

function mapStateToProps(state) {
  return {
    winMessages: state.winMessages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    winMessagesActions: bindActionCreators(winMessagesActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sim);
