import React, { Component } from 'react';
import { Button, Modal, Form, Col } from "react-bootstrap";
import axios from "axios";

class SessionFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      session: this.props.session,
      queueActions: this.props.queueActions,
      validated: false
    }

    this.sessionFormInfo = {};
    this.validated = false;
    this.entryLimitMax = 100;
    this.queueLimitMax = 1000;
    this.sessionFormInfo.streamName = "smellyoctopus";
    this.sessionFormInfo.discordGuildId = "249846152223129602";
  }

  updateName = event => { this.sessionFormInfo.name = event.target.value; }
  updatePlayer = event => { this.sessionFormInfo.player = event.target.value; }
  updatePerGameLimit = event => { this.sessionFormInfo.perGameLimit = event.target.value; }
  updateEntryLimit = event => { this.sessionFormInfo.entryLimit = event.target.value; }
  updateQueueLimit = event => { this.sessionFormInfo.queueLimit = event.target.value; }
  updateTwitchStream = event => { this.sessionFormInfo.streamName = event.target.value; }
  updateDiscordId = event => { this.sessionFormInfo.discordGuildId = event.target.value; }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      const newState = this.state;
      newState.validated = true;
      this.setState(newState);
    }
    else {
      if (!this.sessionFormInfo.entryLimit) {
        this.sessionFormInfo.entryLimit = this.entryLimitMax;
      }
      if (!this.sessionFormInfo.queueLimit) {
        this.sessionFormInfo.queueLimit = this.queueLimitMax;
      }
      this.addSession();
    }
  };

  addSession = async () => {
    this.sessionFormInfo.user = { id: this.props.userId };

    if (!this.sessionFormInfo.entryLimit) {
      this.sessionFormInfo.entryLimit = this.entryLimitMax;
    }
    if (!this.sessionFormInfo.queueLimit) {
      this.sessionFormInfo.queueLimit = this.queueLimitMax;
    }

    let response = {};
    try {
      response = await axios.post("https://k301suduv8.execute-api.us-east-1.amazonaws.com/default/queue", JSON.stringify(this.sessionFormInfo));
      this.sessionFormInfo.id = response.data.sessionId;
      this.state.queueActions.addSession(this.sessionFormInfo);
    } catch (error) {
      this.state.queueActions.addSessionError(error.response.data);
    }

    this.props.toggleSessionModal();
  }

  render() {
    return (
      <Modal show={this.props.showCreateSessionModal} onHide={this.props.toggleSessionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new queued session.</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={this.state.validated}>
          <Modal.Body>
            <Form.Group controlId="sessionName">
              <Form.Label>Session name</Form.Label>
              <Form.Control type="text" placeholder="Another jackbox game?" onChange={this.updateName} required />
              <Form.Control.Feedback type="invalid">
                Please provide name for the session.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="sessionPlayers">
              <Form.Label>People playing on stream</Form.Label>
              <Form.Control type="text" placeholder="Smelly Octopus?" onChange={this.updatePlayer} />
            </Form.Group>
            <Form.Row>
              <Col xs={4}>
                <Form.Group controlId="numberAllowedPerPlayPerGame">
                  <Form.Label>Game Size</Form.Label>
                  <Form.Control type="number" onChange={this.updatePerGameLimit} />
                  <Form.Text className="text-muted">Can be changed later.</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="numberEntriesAllowed">
                  <Form.Label>Entry Number Limit</Form.Label>
                  <Form.Control type="number" onChange={this.updateEntryLimit} />
                  <Form.Text className="text-muted">Leave blank for max.</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Form.Group controlId="numberAllowedPerPlay">
                  <Form.Label>Queue Size Limit</Form.Label>
                  <Form.Control type="number" onChange={this.updateQueueLimit} />
                  <Form.Text className="text-muted">Leave blank for max.</Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={6}>
              <Form.Group controlId="twitchConnection">
                  <Form.Label>Twitch Stream Name</Form.Label>
                  <Form.Control type="text" defaultValue={this.sessionFormInfo.streamName} onChange={this.updateTwitchStream} />
                  <Form.Text className="text-muted">Twitch stream name in url.</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
              <Form.Group controlId="discordConnection">
                  <Form.Label>Discord Server Id</Form.Label>
                  <Form.Control type="text" defaultValue={this.sessionFormInfo.discordGuildId} onChange={this.updateDiscordId} />
                  <Form.Text className="text-muted">Server id from discord.</Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleSessionModal}>Close</Button>
            <Button variant="primary" onClick={this.addSession} >Save changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default SessionFormModal;