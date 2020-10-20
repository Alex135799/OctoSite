import React, { Component } from 'react';
import { Table, Button } from "react-bootstrap";
import '../Queue.css';
import { DateTime } from "luxon";

class SessionTable extends Component {

  getSessionOptionsRows(list) {
    list.sort((entry1, entry2) => (entry1.sessionId < entry2.sessionId) ? 1 : -1);
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

  render() {
    let tableRows = this.getSessionOptionsRows(this.props.queue.sessionOptions);

    return (
      <Table striped bordered responsive size="sm" variant="light">
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Time Created</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    )
  }
}

export default SessionTable;