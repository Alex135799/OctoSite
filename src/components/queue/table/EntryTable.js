import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import '../Queue.css';
import { DateTime } from "luxon";

class EntryTable extends Component {

  getEntryRows(list) {
    list.sort((entry1, entry2) => (entry1.createdAt > entry2.createdAt) ? 1 : -1);
    let tableRows = list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>{tableRowInd}</td>
          <td>{entry.twitchName}</td>
          <td hidden={!this.props.queue.session.showIGN}>{entry.ign}</td>
          <td>{DateTime.fromMillis(entry.createdAt).setZone('America/New_York').toFormat("HH:mm:ss.SSS")}</td>
        </tr>
      )
    });

    return tableRows;
  }

  render() {
    let tableRows = this.getEntryRows(this.props.queue.list);

    return (
      <Table striped bordered responsive size="sm" variant="light">
        <thead>
          <tr>
            <th className={this.props.socketConnectionSetUp? "green" : "black"} onClick={() => this.toggleWebSocket()}>#</th>
            <th>Twitch Name</th>
            <th hidden={!this.props.queue.session.showIGN}>IGN</th>
            <th>Time Entered</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    )
  }
}

export default EntryTable;