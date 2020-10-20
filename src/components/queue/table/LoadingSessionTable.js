import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import { queueLoadingSessionsString } from "../../../common/constants/stringConstants"
import '../Queue.css';

class LoadingSessionTable extends Component {
  
  render() {
    return (
      <Table striped bordered responsive size="sm" variant="light">
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Time Created</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1}>
            <td colSpan={2}>{queueLoadingSessionsString}</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default LoadingSessionTable;