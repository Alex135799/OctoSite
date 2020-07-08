import React, { Component } from 'react';
import { Alert, Button, Modal, Form } from "react-bootstrap";
import { copySession } from "../../common/copy_objects/copyQueue";
import axios from "axios";

class SessionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: this.props.session,
      queueActions: this.props.queueActions,
      showCreateSessionModal: false
    }

    this.sessionFormInfo = {};
    this.toggleSessionModal = this.toggleSessionModal.bind(this);
    this.getCreateSessionModal = this.getCreateSessionModal.bind(this);
  }

  toggleSessionModal() {
    let newShowCreateSessionModal = !this.state.showCreateSessionModal;
    let sessionCopy = copySession(this.state.session);
    this.setState({ session: sessionCopy, showCreateSessionModal: newShowCreateSessionModal });
  }

  updateName = event => { this.sessionFormInfo.name = event.target.value; }
  updatePlayer = event => { this.sessionFormInfo.player = event.target.value; }
  updatePerGameLimit = event => { this.sessionFormInfo.perGameLimit = event.target.value; }
  updateEntryLimit = event => { this.sessionFormInfo.entryLimit = event.target.value; }
  updateQueueLimit = event => { this.sessionFormInfo.queueLimit = event.target.value; }

  addSession = event => {
    this.sessionFormInfo.user = {id: "fiveteen"};
    (async () => {
      try {
        let response = await axios.post("https://k301suduv8.execute-api.us-east-1.amazonaws.com/default/queue", JSON.stringify(this.sessionFormInfo));
        this.sessionFormInfo.id = response.data.sessionId;
        this.state.queueActions.addSession(this.sessionFormInfo);
      } catch (error) {
        this.state.queueActions.addSessionError(error.response.data);
      }
    })();
    
    this.toggleSessionModal();
  }

  getCreateSessionModal() {
    return (
      <Modal show={this.state.showCreateSessionModal} onHide={this.toggleSessionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new queued session.</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="sessionName">
              <Form.Label>Session name</Form.Label>
              <Form.Control type="text" placeholder="Another jackbox game?" onChange={this.updateName} />
            </Form.Group>
            <Form.Group controlId="sessionPlayers">
              <Form.Label>People playing on stream</Form.Label>
              <Form.Control type="text" placeholder="Smelly Octopus?" onChange={this.updatePlayer} />
            </Form.Group>
            <Form.Group controlId="numberAllowedPerPlayPerGame">
              <Form.Label>Number of people allowed to play at once</Form.Label>
              <Form.Control type="number" placeholder="8?" onChange={this.updatePerGameLimit} />
              <Form.Text className="text-muted">Can be changed after creation.</Form.Text>
            </Form.Group>
            <Form.Group controlId="numberEntriesAllowed">
              <Form.Label>Number of times one person can enter the queue for this session</Form.Label>
              <Form.Control type="number" onChange={this.updateEntryLimit} />
              <Form.Text className="text-muted">Leave Blank if a person can enter the queue as many times as they want.</Form.Text>
            </Form.Group>
            <Form.Group controlId="numberAllowedPerPlay">
              <Form.Label>Number of people allowed into the queue</Form.Label>
              <Form.Control type="number" onChange={this.updateQueueLimit} />
              <Form.Text className="text-muted">Leave Blank for no limit.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleSessionModal}>Close</Button>
          <Button variant="primary" onClick={this.addSession}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  getSessionAlert(session) {
    if (!session.id) {
      return (
        <div className="container session" id="sessionInfoRoot">
          <Alert variant="dark" id="sessionAlert">
            No active session.&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={this.toggleSessionModal}>Create Session</Button>
          </Alert>
        </div>
      )
    }
    else {
      return (
        <div className="container session" id="sessionInfoRoot">
          <Alert variant="dark" id="sessionAlert">
            <p>
              {session.player} is playing:
            </p>
            {session.name}
          </Alert>
        </div>
      )
    }
  }

  getErrorAlert(session) {
    if (session.error) {
      return (
        <Alert variant="danger" id="sessionAlert">
          {session.error}
        </Alert>
      );
    }
    else {
      return (
        <div />
      );
    }
  }

  render() {
    let errorAlert = this.getErrorAlert(this.props.session);
    let sessionAlert = this.getSessionAlert(this.props.session);
    let sessionModal = this.getCreateSessionModal(this.props.session);

    let sessionRender = [];
    sessionRender.push(errorAlert);
    sessionRender.push(sessionAlert);
    sessionRender.push(sessionModal);

    return sessionRender;
  }
}

export default SessionInfo;