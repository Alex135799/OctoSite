import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import { backendUrl, octoChannelId, websocketUrl } from "../../common/constants/stringConstants"
import './Queue.css';
import axios from "axios";
import * as ws from "websocket";
import LoadingEntryTable from "./table/LoadingEntryTable"
import LoadingSessionTable from "./table/LoadingSessionTable"
import EmptyEntryTable from "./table/EmptyEntryTable"
import EmptySessionTable from "./table/EmptySessionTable"
import SessionTable from "./table/SessionTable"
import EntryTable from "./table/EntryTable"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Queue extends Component {
  constructor(props) {
    super(props);

    window.addEventListener("resize", this.changeTableHeight);

    this.state = {
      socketConnectionSetUp: false,
      socketConnectionToggledOff: false,
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: 0,
      sesionInfoHeight: 0
    }

    this.initiallyLoadingQueue = false;
    this.initiallyLoadingSessions = false;
    this.tableFillRatio = .7;
    this.primaryElementName = "sessionInfoRoot";
    this.client = {};
  }

  toggleWebSocket = () => {
    if (this.state.socketConnectionSetUp) {
      this.client.close();
      this.setState({
        socketConnectionSetUp: false,
        socketConnectionToggledOff: true,
        user: this.props.user,
        queue: this.props.queue,
        tableHeight: this.state.tableHeight,
        sesionInfoHeight: this.state.sesionInfoHeight
      });
    }
    else {
      this.setupWebSocket(this.props.queueActions);
    }
  }

  setupWebSocket = (queueActions) => {
    this.client = new ws.w3cwebsocket(websocketUrl);

    this.client.onerror = function(err) {
      console.log("WebSocket Connection Error");
    }
    this.client.onopen = function(msg) {
      console.log("WebSocket Connected");
    }
    this.client.onclose = function(msg) {
      console.log("WebSocket Closed");
      this.socketConnectionSetUp = false;
    }
    this.client.onmessage = function(message) {
      let messageData = JSON.parse(message.data);
      if (messageData.action && messageData.action === "add") {
        queueActions.addToQueue([messageData]);
      } else if (messageData.action && messageData.action === "remove") {
        queueActions.removeFromQueue([messageData]);
      }
    }

    this.setState({
      socketConnectionSetUp: true,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff,
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: this.state.tableHeight,
      sesionInfoHeight: this.state.sesionInfoHeight
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let sesionInfoHeight = document.getElementById(this.primaryElementName).clientHeight;
    if (prevState.sesionInfoHeight !== sesionInfoHeight) {
      this.changeTableHeight();
    }
  }

  componentDidMount() {
    this.changeTableHeight();
    if (!this.state.socketConnectionSetUp && !this.state.socketConnectionToggledOff) {
      this.setupWebSocket(this.props.queueActions);
    }
  }

  changeTableHeight = () => {
    let sesionInfoHeight = document.getElementById(this.primaryElementName).clientHeight;
    let windowHeight = window.innerHeight;
    let availableHeight = windowHeight - sesionInfoHeight;
    let tableHeight = availableHeight * this.tableFillRatio;
    this.setState({
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: tableHeight,
      sesionInfoHeight: sesionInfoHeight,
      socketConnectionSetUp: this.state.socketConnectionSetUp,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff
    });
  }

  loadSessionEntries(sessionId) {
    this.initiallyLoadingQueue = true;
    axios.get(backendUrl + "queue/entry?sessionId=" + sessionId + "&active=true").then((response) => {
      this.props.queueActions.replaceQueue(response.data.Items)
    });
  }

  loadSessionOptions(channelId) {
    this.initiallyLoadingSessions = true;
    axios.get(backendUrl + "queue?streamName=" + channelId + "&reverse=true").then((response) => {
      this.props.queueActions.addSessionOptions(response.data.Items)
    });
  }

  render() {
    let tableToUse;

    if (this.props.queue.session.sessionId) {
      if (!this.initiallyLoadingQueue) {
        this.loadSessionEntries(this.props.queue.session.sessionId);
        tableToUse = <LoadingEntryTable toggleWebSocket={this.toggleWebSocket} socketConnectionSetUp={this.state.socketConnectionSetUp} queue={this.props.queue} />
      }
      else if (this.props.queue.list.length === 0) {
        tableToUse = <EmptyEntryTable toggleWebSocket={this.toggleWebSocket} socketConnectionSetUp={this.state.socketConnectionSetUp} queue={this.props.queue} />
      }
      else {
        tableToUse = <EntryTable queue={this.props.queue} toggleWebSocket={this.toggleWebSocket} socketConnectionSetUp={this.state.socketConnectionSetUp} />
      }
    } else {
      if (!this.initiallyLoadingSessions) {
        this.loadSessionOptions(octoChannelId);
        tableToUse = <LoadingSessionTable />
      }
      else if (this.props.queue.sessionOptions.length === 0) {
        tableToUse = <EmptySessionTable />
      }
      else {
        tableToUse = <SessionTable queue={this.props.queue} queueActions={this.props.queueActions} />
      }
    }
    
    return (
      <Container id="queueRoot">
        <SessionInfo queue={this.props.queue} queueActions={this.props.queueActions} user={this.props.user} />
        <div className="scroll-table" style={{ height: this.state.tableHeight }} >
          {tableToUse}
        </div>
      </Container>
    )
  }
}

Queue.propTypes = {
  queueActions: PropTypes.object,
  queue: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps(state) {
  return {
    queue: state.queue,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queueActions: bindActionCreators(queueActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);