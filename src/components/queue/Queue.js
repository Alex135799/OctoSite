import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import {queueSessionLoadingString} from "../../common/constants/stringConstants"
import './Queue.css';

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
  }

  getTableRows(queue) {
    let tableRows = queue.list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>{tableRowInd}</td>
          <td colSpan={entry.name === queueSessionLoadingString ? 3 : 1}>{entry.name}</td>
        </tr>
      )
    });
    return tableRows
  }

  render() {
    let tableRows = this.getTableRows(this.props.queue);

    return (
      <div className="container" id="queueRoot">
        <SessionInfo session={this.props.queue.session} queueActions={this.props.queueActions} user={this.props.user} />
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