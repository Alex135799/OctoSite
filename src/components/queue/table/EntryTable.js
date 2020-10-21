import React, { Component } from 'react';
import { Button, Table } from "react-bootstrap";
import '../Queue.css';
import { activateEntry } from "../QueueEntryMovement";
import { DateTime } from "luxon";

class EntryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModifyingList: false
    }
  }

  loadIn = async (rowInd, event) => {
    this.setState({
      isModifyingList: true
    })
    let queueIndex = rowInd - 1;
    await activateEntry(this.props.queue.list, this.props.queue.inactiveList, this.props.queue.list[queueIndex], queueIndex, "false", this.props.queueActions);
    this.setState({
      isModifyingList: false
    })
  }

  bringBack = async (rowInd, event) => {
    this.setState({
      isModifyingList: true
    })
    let queueIndex = rowInd - 1;
    await activateEntry(this.props.queue.list, this.props.queue.inactiveList, this.props.queue.inactiveList[queueIndex], queueIndex, "true", this.props.queueActions);
    this.setState({
      isModifyingList: false
    })
  }

  getEntryRows(list) {
    let shouldShowCherryPick = !this.props.isUserAdmin && this.props.isCherryPickingOn;

    list.sort((entry1, entry2) => (entry1.createdAt > entry2.createdAt) ? 1 : -1);
    let tableRows = list.map((entry, tableRowInd) => {
      tableRowInd++;
      return (
        <tr key={tableRowInd}>
          <td>{tableRowInd}</td>
          <td>{entry.twitchName}</td>
          <td hidden={!this.props.queue.session.showIGN}>{entry.ign}</td>
          <td hidden={!shouldShowCherryPick}>
            <Button variant="info" disabled={this.state.isModifyingList}
                    onClick={this.props.showToEnter ? (e) => this.loadIn(tableRowInd, e) : (e) => this.bringBack(tableRowInd, e)}>
              {this.props.showToEnter ? "Let In" : "Bring Back"}
            </Button>  
          </td>
          <td hidden={shouldShowCherryPick}>
            {DateTime.fromMillis(entry.createdAt).setZone('America/New_York').toFormat("HH:mm:ss.SSS")}
          </td>
        </tr>
      )
    });

    return tableRows;
  }

  render() {
    let tableRows = this.props.showToEnter ? this.getEntryRows(this.props.queue.list) : this.getEntryRows(this.props.queue.inactiveList);

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
          {tableRows}
        </tbody>
      </Table>
    )
  }
}

export default EntryTable;