import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import { queueEmptyString, queueLoadingString, queueNoSessionString, backendUrl, octoChannelId, queueLoadingSessionsString, websocketUrl } from "../../common/constants/stringConstants"
import './Queue.css';
import axios from "axios";
import { DateTime } from "luxon";
import * as ws from "websocket";

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

  getTableMessage(message, colspan) {
    return (
      <tr key={1}>
        <td colSpan={colspan}>{message}</td>
      </tr>
    )
  }

  getEntryRows(list) {
    if (!this.state.socketConnectionSetUp && !this.state.socketConnectionToggledOff) {
      this.setupWebSocket(this.props.queueActions);
    }
    let tableRows = list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>{tableRowInd}</td>
          <td>{entry.twitchName}</td>
          <td>{DateTime.fromMillis(entry.createdAt).setZone('America/New_York').toFormat("HH:mm:ss.SSS")}</td>
        </tr>
      )
    });

    return tableRows;
  }

  getSessionOptionsRows(list) {
    let tableRows = list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>
            <Button variant="outline-secondary" size="lg" block onClick={() => this.props.queueActions.addSession(entry)}>
              {entry.name}
            </Button>
          </td>
          <td>{DateTime.fromMillis(parseInt(entry.sessionId)).setZone('America/New_York').toFormat("MM/dd/yyyy hh:mm:ss")}</td>
        </tr>
      )
    });

    return tableRows;
  }

  getTableRows(queue) {
    if (queue.session.sessionId) {
      if (!this.initiallyLoadingQueue) {
        this.loadSessionEntries(queue.session.sessionId);
        return this.getTableMessage(queueLoadingString, 3);
      }
      else if (queue.list.length === 0) {
        return this.getTableMessage(queueEmptyString, 3);
      }
    } else {
      if (!this.initiallyLoadingSessions) {
        this.loadSessionOptions(octoChannelId);
        return this.getTableMessage(queueLoadingSessionsString, 2);
      }
      else if (queue.sessionOptions.length === 0) {
        return this.getTableMessage(queueNoSessionString, 2);
      }
      else {
        return this.getSessionOptionsRows(queue.sessionOptions);
      }
    }
    
    return this.getEntryRows(queue.list);
  }

  getTableHeader(queue) {
    if (queue.list.length === 0 && !queue.session.sessionId) {
      return (
        <tr>
          <th>Session Name</th>
          <th>Time Created</th>
        </tr>
      )
    }

    return (
      <tr>
        <th className={this.state.socketConnectionSetUp? "green" : "black"} onClick={() => this.toggleWebSocket()}>#</th>
        <th>Twitch Name</th>
        <th>Time Entered</th>
      </tr>
    )
  }

  render() {
    let tableRows = this.getTableRows(this.props.queue);
    let tableHeader = this.getTableHeader(this.props.queue);

    return (
      <Container id="queueRoot">
        <SessionInfo queue={this.props.queue} queueActions={this.props.queueActions} user={this.props.user} />
        <div className="scroll-table" style={{ height: this.state.tableHeight }} >
          <Table striped bordered responsive size="sm" variant="light">
            <thead>
              {tableHeader}
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>
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