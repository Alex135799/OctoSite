import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset the Counters</Button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 100) {
      return <Button variant="dark" onClick={this.resetWinMessages}>You win! Quit while you still can!</Button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 75) {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset the decent Counters</Button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 50) {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset the respectable Counters</Button>
    }
    else if (this.props.winMessages.pullSummary.totalWins * 100 / this.props.winMessages.pullSummary.totalPulls > 0) {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset the shameful Counters</Button>
    }
    else if (this.props.winMessages.pullSummary.totalPulls > 100) {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset these Counters, they are making me cry</Button>
    }
    else if (this.props.winMessages.pullSummary.totalPulls > 1000) {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset these Counters, I can't even see through the tears</Button>
    }
    else {
      return <Button variant="dark" onClick={this.resetWinMessages}>Reset the Counters</Button>
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
            {this.props.winMessages.winMessage}
          </p>
          <p>
            Total number of pulls: {this.props.winMessages.pullSummary.totalPulls}.
            Total number of actual wins: {this.props.winMessages.pullSummary.totalWins}.
          </p>
          {this.resetButton()}
        </header>
      </div>
    );
  }
}

Sim.propTypes = {
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
