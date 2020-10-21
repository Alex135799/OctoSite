import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl, OverlayTrigger, Popover } from "react-bootstrap";
import { activateEntry } from "./QueueEntryMovement";

class SessionActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: this.props.queue.session,
      isModifyingList: false
    }

    this.loadInNumber = 1;
    this.bringBackNumber = 1;
  }

  changeLoadInNumber = event => { this.loadInNumber = event.target.value; }
  changeBringBackNumber = event => { this.bringBackNumber = event.target.value; }

  loadIn = async () => {
    this.setState({
      session: this.props.queue.session,
      isModifyingList: true
    })
    let queueListCopy = this.props.queue.list.slice();
    let loadInNum = parseInt(this.loadInNumber);
    if (queueListCopy.length < loadInNum) loadInNum = queueListCopy.length;
    for (var i = 0; i < loadInNum; i++) {
      let listIndex = i;
      await activateEntry(this.props.queue.list, this.props.queue.inactiveList, queueListCopy[listIndex], 0, "false", this.props.queueActions);
    }
    this.setState({
      session: this.props.queue.session,
      isModifyingList: false
    })
  }

  bringBack = async () => {
    this.setState({
      session: this.props.queue.session,
      isModifyingList: true
    })
    let queueInactiveListCopy = this.props.queue.inactiveList.slice();
    let bringBackNum = parseInt(this.bringBackNumber);
    if (queueInactiveListCopy.length < bringBackNum) bringBackNum = queueInactiveListCopy.length;
    if (bringBackNum === 0) {
      this.props.queueActions.addSessionError("Nobody left to bring back.");
    }
    else {
      for (var j = 1; j < bringBackNum + 1; j++) {
        let listIndex = queueInactiveListCopy.length - j;
        await activateEntry(this.props.queue.list, this.props.queue.inactiveList, queueInactiveListCopy[listIndex], this.props.queue.inactiveList.length - 1, "true", this.props.queueActions);
      }
    }
    
    this.setState({
      session: this.props.queue.session,
      isModifyingList: false
    })
  }

  render() {
    return (
      <div hidden={this.props.hidden}>
        <ButtonToolbar className="mb-3 d-none d-md-block" >
          <ButtonGroup className="mr-2 col-12 justify-content-center" >
            <Button variant="dark" id="newSession" className="col-3" onClick={this.props.toggleSessionModal} hidden={this.props.isUserAdmin}>
              New Session
            </Button>
            <Button variant="dark" id="connectBot" className="col-3" onClick={this.props.toggleConnectBotModal} hidden={this.props.isUserAdmin}>
              Connect Bot
            </Button>
            <Button variant="danger" id="stopSession" className="col-3" 
                    onClick={this.props.toggleRemoveSessionConfirmationModal} 
                    hidden={this.props.isUserAdmin || this.props.queue.session.sessionActive === "false"}>
              Close Session
            </Button>
            <Button variant="dark" id="leaveSession" className="col-4" onClick={this.props.queueActions.leaveSession} >
              Leave Session
            </Button>
            <OverlayTrigger key={1} placement={"top"}
              overlay={
                <Popover id={"popover-1"}>
                  <Popover.Title as="h3">
                    {this.props.isShowingToEnter ? 
                    "Now showing NOT joined" : 
                    "Now showing ALREADY joined"}
                  </Popover.Title>
                  <Popover.Content>
                    {this.props.isShowingToEnter ? 
                    "Click this button to show people who have already joined." : 
                    "Click this button to show people who are still waiting in the queue to join."}
                  </Popover.Content>
                </Popover>
              }>
              <Button variant="dark" id="bringBackPeople" className="col-4" onClick={this.props.toggleShowToEnter} 
                      disabled={this.state.isModifyingList} hidden={!this.props.isUserAdmin} >
                {this.props.isShowingToEnter ? "Show Entered" : "Show To Enter"}
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3 d-block d-md-none">
          <ButtonGroup className="mr-2 col-12 justify-content-center" >
            <Button variant="dark" id="newSession" className="col-4" onClick={this.props.toggleSessionModal} hidden={this.props.isUserAdmin} >
              New
            </Button>
            <Button variant="dark" id="connectBot" className="col-4" onClick={this.props.toggleConnectBotModal} hidden={this.props.isUserAdmin} >
              Connect
            </Button>
            <Button variant="danger" id="stopSession" className="col-4" 
                    onClick={this.props.toggleRemoveSessionConfirmationModal} 
                    hidden={this.props.isUserAdmin || this.props.queue.session.sessionActive === "false"}>
              Close
            </Button>
            <Button variant="dark" id="leaveSession" className="col-4" onClick={this.props.queueActions.leaveSession} >
              Leave
            </Button>
            <OverlayTrigger key={1} placement={"top"} hidden={!this.props.isUserAdmin}
              overlay={
                <Popover id={"popover-1"}>
                  <Popover.Title as="h3">
                    {this.props.isShowingToEnter ? 
                    "Now showing NOT joined" : 
                    "Now showing ALREADY joined"}
                  </Popover.Title>
                  <Popover.Content>
                    {this.props.isShowingToEnter ? 
                    "Click this button to show people who have already joined." : 
                    "Click this button to show people who are still waiting in the queue to join."}
                  </Popover.Content>
                </Popover>
              }>
              <Button variant="dark" id="bringBackPeople" className="col-6" onClick={this.props.toggleShowToEnter} 
                      disabled={this.state.isModifyingList} hidden={!this.props.isUserAdmin} >
                {this.props.isShowingToEnter ? "Show Entered" : "Show To Enter"}
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </ButtonToolbar>

        <ButtonToolbar className="mb-3 col-12 d-none d-md-block" hidden={this.props.isUserAdmin}>
          <ButtonGroup className="col-6 justify-content-start" hidden={this.props.isUserAdmin}>
            <Button variant="dark" id="loadInMorePeople" className="col-6" onClick={this.loadIn} disabled={this.state.isModifyingList}>
              {this.state.isModifyingList ? "Working..." : "Let In:"}
            </Button>
            <InputGroup className="col-5" onChange={this.changeLoadInNumber} >
              <FormControl type="number" defaultValue={this.loadInNumber} />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup className="col-6 justify-content-end" hidden={this.props.isUserAdmin}>
            <Button variant="dark" id="bringBackPeople" className="col-6" onClick={this.bringBack} disabled={this.state.isModifyingList} >
              {this.state.isModifyingList ? "Working..." : "Bring Back:"}
            </Button>
            <InputGroup className="col-5" onChange={this.changeBringBackNumber} >
              <FormControl type="number" defaultValue={this.bringBackNumber} />
            </InputGroup>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3 col-12 d-block d-md-none" hidden={this.props.isUserAdmin}>
          <ButtonGroup className="col-12 justify-content-start" hidden={this.props.isUserAdmin}>
            <Button variant="dark" id="loadInMorePeople" className="col-6" onClick={this.loadIn} disabled={this.state.isModifyingList}>
              {this.state.isModifyingList ? "Working..." : "Let In:"}
            </Button>
            <InputGroup className="col-6" onChange={this.changeLoadInNumber} >
              <FormControl type="number" defaultValue={this.loadInNumber} />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup className="col-12 justify-content-end" hidden={this.props.isUserAdmin}>
            <Button variant="dark" id="bringBackPeople" className="col-6" onClick={this.bringBack} disabled={this.state.isModifyingList} >
              {this.state.isModifyingList ? "Working..." : "Bring Back:"}
            </Button>
            <InputGroup className="col-6" onChange={this.changeBringBackNumber} >
              <FormControl type="number" defaultValue={this.bringBackNumber} />
            </InputGroup>
          </ButtonGroup>
        </ButtonToolbar>
        
        <ButtonToolbar className="mb-3 d-none d-md-block" hidden={this.props.isUserAdmin}>
          <ButtonGroup className="col-6 offset-3" hidden={this.props.isUserAdmin}>
            <OverlayTrigger key={1} placement={"top"}
              overlay={
                <Popover id={"popover-1"}>
                  <Popover.Title as="h3">
                    {this.props.isShowingToEnter ? 
                    "Now showing NOT joined" : 
                    "Now showing ALREADY joined"}
                  </Popover.Title>
                  <Popover.Content>
                    {this.props.isShowingToEnter ? 
                    "Click this button to show people who have already joined." : 
                    "Click this button to show people who are still waiting in the queue to join."}
                  </Popover.Content>
                </Popover>
              }>
              <Button variant="dark" id="bringBackPeople" className="col-7" onClick={this.props.toggleShowToEnter} disabled={this.state.isModifyingList} >
                {this.props.isShowingToEnter ? "Show Entered" : "Show To Enter"}
              </Button>
            </OverlayTrigger>
            <Button variant={this.props.isCherryPickingOn ? "info" : "dark"} id="cherryPick" className="col-5" onClick={this.props.toggleCherryPick} disabled={this.state.isModifyingList} >
              Cherry Pick
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mb-3 d-block d-md-none" hidden={this.props.isUserAdmin}>
          <ButtonGroup className="col-8 offset-2" hidden={this.props.isUserAdmin}>
            <OverlayTrigger key={1} placement={"top"}
              overlay={
                <Popover id={"popover-1"}>
                  <Popover.Title as="h3">
                    {this.props.isShowingToEnter ? 
                    "Now showing NOT joined" : 
                    "Now showing ALREADY joined"}
                  </Popover.Title>
                  <Popover.Content>
                    {this.props.isShowingToEnter ? 
                    "Click this button to show people who have already joined." : 
                    "Click this button to show people who are still waiting in the queue to join."}
                  </Popover.Content>
                </Popover>
              }>
              <Button variant="dark" id="toggleList" className="col-7" onClick={this.props.toggleShowToEnter} disabled={this.state.isModifyingList} >
                {this.props.isShowingToEnter ? "Show Entered" : "Show To Enter"}
              </Button>
            </OverlayTrigger>
            <Button variant={this.props.isCherryPickingOn ? "info" : "dark"} id="cherryPick" className="col-5" onClick={this.props.toggleCherryPick} disabled={this.state.isModifyingList} >
              Cherry Pick
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <hr />
      </div>
    )
  }
}

export default SessionActions;