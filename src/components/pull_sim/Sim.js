import React, { Component } from 'react';
import PullSimResetButton from './PullSimResetButton'
import PullAnimation from './PullAnimation'
import logo from '../../assets/logo.svg';
import './Sim.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as winMessagesActions from '../../actions/winMessagesActions';
import PropTypes from 'prop-types';
import copyWinMessages from '../../common/copyWinMessages'

class Sim extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      winMessages: copyWinMessages(this.props.winMessages)
    }
    this.state = {
      winMessages: this.props.winMessages
    }
  }

  updateWinMessages = event => {
    this.props.winMessagesActions.updateWinMessages(this.props.winMessages.pullSummary);
  }

  resetWinMessages = event => {
    this.setState( { "winMessages": copyWinMessages(this.initialState.winMessages) } );
    this.props.winMessagesActions.resetWinMessages();
  }

  render() {
    let totalPulls = this.props.winMessages.pullSummary.totalPulls;
    let totalWins = this.props.winMessages.pullSummary.totalWins;
    let winType = this.props.winMessages.winType;
    return (
      <div className="Sim">
        <header className="Sim-header">
          <img src={logo} className="Sim-logo" alt="logo"
            onClick={this.updateWinMessages} />
          <PullAnimation winType={winType} />
          <p>
            {this.props.winMessages.winMessage}
          </p>
          <p>
            Total number of pulls: {totalPulls}.
            Total number of actual wins: {totalWins}.
          </p>
          <PullSimResetButton totalPulls={totalPulls} totalWins={totalWins} onClick={this.resetWinMessages} />
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
