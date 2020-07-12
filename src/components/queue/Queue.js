import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import { queueEmptyString, queueLoadingString, queueNoSessionString, backendUrl, octoUserId, queueLoadingSessionsString } from "../../common/constants/stringConstants"
import './Queue.css';
import axios from "axios";
import { DateTime } from "luxon";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Queue extends Component {
  constructor(props) {
    super(props);

    window.addEventListener("resize", this.changeTableHeight);

    this.state = {
      user: this.props.user,
      queue: this.props.queue
    }

    this.initiallyLoadingQueue = false;
    this.initiallyLoadingSessions = false;
    this.tableFillRatio = .7;
    this.primaryElementName = "sessionInfoRoot";
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
      sesionInfoHeight: sesionInfoHeight
    });
  }

  loadSessionEntries(sessionId) {
    this.initiallyLoadingQueue = true;
    axios.get(backendUrl + "queue/entry?sessionId=" + sessionId + "&active=true").then((response) => {
      this.props.queueActions.addToQueue(response.data.Items)
    });
  }

  loadSessionOptions(userId) {
    this.initiallyLoadingSessions = true;
    axios.get(backendUrl + "queue?userId=" + userId + "&sessionActive=true").then((response) => {
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
          <td>{DateTime.fromMillis(parseInt(entry.sessionId)).setZone('America/New_York').toFormat("D")}</td>
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
        this.loadSessionOptions(octoUserId);
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
          <th>Date Created</th>
        </tr>
      )
    }

    return (
      <tr>
        <th>#</th>
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