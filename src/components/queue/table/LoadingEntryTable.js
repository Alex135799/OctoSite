import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import { queueLoadingString } from "../../../common/constants/stringConstants"
import '../Queue.css';

class LoadingEntryTable extends Component {

  render() {
    return (
      <Table striped bordered responsive size="sm" variant="light">
        <thead>
          <tr>
            <th className={this.props.socketConnectionSetUp? "green" : "black"} onClick={() => this.props.toggleWebSocket()}>#</th>
            <th>Twitch Name</th>
            <th hidden={!this.props.queue.session.showIGN}>IGN</th>
            <th>Time Entered</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1} hidden={!this.props.queue.session.showIGN}>
            <td colSpan={4}>{queueLoadingString}</td>
          </tr>
          <tr key={2} hidden={this.props.queue.session.showIGN}>
            <td colSpan={3}>{queueLoadingString}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default LoadingEntryTable;