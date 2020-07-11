import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import { queueEmptyString, queueLoadingString, queueNoSessionString } from "../../common/constants/stringConstants"
import './Queue.css';
import { backendUrl } from "../../common/constants/stringConstants";
import axios from "axios";
import { DateTime } from "luxon";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      queue: this.props.queue
    }

    this.initiallyLoadingQueue = false;
  }

  getTableRows(queue) {
    if (queue.list.length === 0) {
      if (queue.session.sessionId && !this.initiallyLoadingQueue) {
        axios.get(backendUrl + "queue/entry?sessionId=" + queue.session.sessionId + "&active=true").then((response) => {
          this.props.queueActions.addToQueue(response.data.Items)
        });
        this.initiallyLoadingQueue = true;
        return (
          <tr key={1}>
            <td>1</td>
            <td colSpan={3}>{queueLoadingString}</td>
          </tr>
        )
      }
      if (queue.session.sessionId) {
        return (
          <tr key={1}>
            <td>1</td>
            <td colSpan={3}>{queueEmptyString}</td>
          </tr>
        )
      } else {
        return (
          <tr key={1}>
            <td>1</td>
            <td colSpan={3}>{queueNoSessionString}</td>
          </tr>
        )
      }
    }

    let tableRows = queue.list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>{tableRowInd}</td>
          <td>{entry.discordName}</td>
          <td>{entry.twitchName}</td>
          <td>{DateTime.fromMillis(entry.createdAt).setZone('America/New_York').toFormat("HH:mm:ss.SSS")}</td>
        </tr>
      )
    });
    return tableRows
  }

  render() {
    let tableRows = this.getTableRows(this.props.queue);

    return (
      <div className="container" id="queueRoot">
        <SessionInfo queue={this.props.queue} queueActions={this.props.queueActions} user={this.props.user} />
        <div class="scroll-table">
          <Table striped bordered responsive size="sm" variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Discord Name</th>
                <th>Twitch Name</th>
                <th>Time Entered</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>
        </div>
      </div>
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