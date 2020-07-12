import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import { backendUrl } from "../../common/constants/stringConstants";
import axios from "axios";

class SessionActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: this.props.queue.session
    }

    this.loadInNumber = 1;
    this.bringBackNumber = 1;
  }

  changeLoadInNumber = event => { this.loadInNumber = event.target.value; }
  changeBringBackNumber = event => { this.bringBackNumber = event.target.value; }

  loadIn = async () => {
    try {
      let queueListCopy = this.props.queue.list.slice();
      if (queueListCopy.length < this.loadInNumber) this.loadInNumber = queueListCopy.length;
      for (var i = 0; i < this.loadInNumber; i++) {
        let queueEntry = queueListCopy.shift();
        await this.activateEntry(queueEntry, "false");
      }
      this.props.queueActions.loadIn(this.loadInNumber, this.props.queue.list);
    } catch (error) {
      if (!error.response) {
        console.error(JSON.stringify(error));
      } else {
        this.props.queueActions.addSessionError(error.response.data);
      }
    }
  }

  activateEntry = async (entry, activeStatus) => {
    let timeEntered = entry.createdAt;
    let sessionId = entry.sessionId;
    let patchInfo = { "active": activeStatus };
    await axios.patch(backendUrl + "queue/entry/" + sessionId + "/" + timeEntered, JSON.stringify(patchInfo));
  }

  bringBack = async () => {
    try {
      let toAdd = await axios.get(backendUrl + "queue/entry?sessionId=" + this.state.session.sessionId + "&active=false&limit=" + this.bringBackNumber + "&reverse=true");
      let toBringBack = toAdd.data.Items;
      if (toBringBack.length === 0) {
        this.props.queueActions.addSessionError("Nobody left to bring back.");
      }
      for (var j = 0; j < toBringBack.length; j++) {
        await this.activateEntry(toBringBack[j], "true");
      }
      this.props.queueActions.bringBack(toBringBack, this.props.queue.list);
    } catch (error) {
      if (!error.response) {
        console.error(JSON.stringify(error));
      } else {
        this.props.queueActions.addSessionError(error.response.data);
      }
    }
  }

  render() {
    return (
      <div hidden={this.props.hidden}>
        <ButtonToolbar className="mb-3 d-none d-md-block" >
          <ButtonGroup className="mr-2 col-12 justify-content-center" >
            <Button variant="dark" id="newSession" className="col-3" onClick={this.props.toggleSessionModal} >
              New Session
            </Button>
            <Button variant="dark" id="connectBot" className="col-3" onClick={this.props.toggleConnectBotModal} >
              Connect Bot
          </Button>
            <Button variant="dark" id="removeSession" className="col-3" onClick={this.props.toggleRemoveSessionConfirmationModal} >
              Remove Session
          </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3 d-block d-md-none" >
          <ButtonGroup className="mr-2 col-12 justify-content-center" >
            <Button variant="dark" id="newSession" className="col-4" onClick={this.props.toggleSessionModal} >
              New
            </Button>
            <Button variant="dark" id="connectBot" className="col-4" onClick={this.props.toggleConnectBotModal} >
              Connect
          </Button>
            <Button variant="dark" id="removeSession" className="col-4" onClick={this.props.toggleRemoveSessionConfirmationModal} >
              Remove
          </Button>
          </ButtonGroup>
        </ButtonToolbar>


        <ButtonToolbar className="mb-3 col-12 d-none d-md-block">
          <ButtonGroup className="col-6 justify-content-start">
            <Button variant="dark" id="loadInMorePeople" className="col-6" onClick={this.loadIn}>
              Let In:
          </Button>
            <InputGroup className="col-5" onChange={this.changeLoadInNumber} >
              <FormControl type="number" defaultValue={this.loadInNumber} />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup className="col-6 justify-content-end">
            <Button variant="dark" id="bringBackPeople" className="col-6" onClick={this.bringBack} >
              Bring Back:
          </Button>
            <InputGroup className="col-5" onChange={this.changeBringBackNumber} >
              <FormControl type="number" defaultValue={this.bringBackNumber} />
            </InputGroup>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3 col-12 d-block d-md-none">
          <ButtonGroup className="col-12 justify-content-start">
            <Button variant="dark" id="loadInMorePeople" className="col-6" onClick={this.loadIn} >
              Let In:
          </Button>
            <InputGroup className="col-6" onChange={this.changeLoadInNumber} >
              <FormControl type="number" defaultValue={this.loadInNumber} />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup className="col-12 justify-content-end">
            <Button variant="dark" id="bringBackPeople" className="col-6" onClick={this.bringBack} >
              Bring Back:
          </Button>
            <InputGroup className="col-6" onChange={this.changeBringBackNumber} >
              <FormControl type="number" defaultValue={this.bringBackNumber} />
            </InputGroup>
          </ButtonGroup>
        </ButtonToolbar>

        <hr />
      </div>
    )
  }
}

export default SessionActions;