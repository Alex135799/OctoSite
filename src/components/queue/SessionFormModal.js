import React, { Component } from 'react';
import { Button, Modal, Form, Col } from "react-bootstrap";
import { backendUrl } from "../../common/constants/stringConstants";
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
    this.sessionFormInfo.streamName = "smellyoctopus";
    this.sessionFormInfo.discordGuildId = "249846152223129602";
    this.entryLimitMax = 1;
    this.queueLimitMax = 1000;
  }

  updateName = event => { this.sessionFormInfo.name = event.target.value; }
  updatePlayer = event => { this.sessionFormInfo.player = event.target.value; }
  updateShowIGN = event => { this.sessionFormInfo.showIGN = event.target.value; }
  updatePerGameLimit = event => { this.sessionFormInfo.perGameLimit = event.target.value; }
  updateEntryLimit = event => { this.sessionFormInfo.entryLimit = event.target.value; }
  updateQueueLimit = event => { this.sessionFormInfo.queueLimit = event.target.value; }
  updateTwitchStream = event => { this.sessionFormInfo.streamName = event.target.value; }
  updateDiscordId = event => { this.sessionFormInfo.discordGuildId = event.target.value; }

  addSession = async () => {
    this.sessionFormInfo.userId = this.props.userId;

    if (!this.sessionFormInfo.entryLimit) {
      this.sessionFormInfo.entryLimit = this.entryLimitMax;
    }
    if (!this.sessionFormInfo.queueLimit) {
      this.sessionFormInfo.queueLimit = this.queueLimitMax;
    }

    try {
      let response = await axios.post(backendUrl + "queue", JSON.stringify(this.sessionFormInfo));
      this.sessionFormInfo.sessionId = response.data.sessionId;
      this.state.queueActions.addSession(this.sessionFormInfo);
      this.props.queueActions.replaceQueue([]);
    } catch (error) {
      if (!error.response) {
        console.error(JSON.stringify(error));
      } else {
        this.state.queueActions.addSessionError(error.response.data);
      }
    }

    this.props.toggleSessionModal();
  }

  connectBot = async () => {
    let streamName = this.sessionFormInfo.streamName;
    let discordGuildId = this.sessionFormInfo.discordGuildId;

    let addBotRequest = {};
    if (streamName) {
      addBotRequest.streamName = streamName;
    }
    if (discordGuildId) {
      addBotRequest.discordGuildId = discordGuildId;
    }
    if (!streamName && !discordGuildId) {
      this.state.queueActions.addSessionError("Need to pass in either stream name or discordGuild Id");
      this.props.toggleConnectBotModal();
    }

    try {
      let response = await axios.patch(backendUrl + "queue/" + this.props.session.sessionId, JSON.stringify(addBotRequest));
      this.state.queueActions.addSession(response.data);
    } catch (error) {
      if (!error.response) {
        console.error(JSON.stringify(error));
      } else {
        this.state.queueActions.addSessionError(error.response.data);
      }
    }

    this.props.toggleConnectBotModal();
  }

  removeSession = async () => {
    try {
      await axios.delete(backendUrl + "queue/" + this.props.session.sessionId);
      this.state.queueActions.removeSession(this.props.session.sessionId);
    } catch (error) {
      if (!error.response) {
        console.error(JSON.stringify(error));
      } else {
        this.state.queueActions.addSessionError(error.response.data);
      }
    }

    this.props.toggleRemoveSessionConfirmationModal();
  }

  render() {
    return (
      <div>
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
                <Col xs={12}>
                  <Form.Group controlId="showIGN" className="text-center">
                    <Form.Check type="checkbox" label="Turn on IGN submission" onChange={this.updateShowIGN}/>
                    <Form.Text className="text-muted">Turning this on allows users to provide their IGN into the queue.</Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={6}>
                  <Form.Group controlId="numberEntriesAllowed">
                    <Form.Label>Entry Number Limit</Form.Label>
                    <Form.Control type="number" onChange={this.updateEntryLimit} />
                    <Form.Text className="text-muted">Leave blank for just once.</Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="numberAllowedPerPlay">
                    <Form.Label>Queue Size Limit</Form.Label>
                    <Form.Control type="number" onChange={this.updateQueueLimit} />
                    <Form.Text className="text-muted">Leave blank for max (1000).</Form.Text>
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
                    <Form.Text className="text-muted">Server id from discord. (Not yet supported).</Form.Text>
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


        <Modal show={this.props.showConnectBotModal} onHide={this.props.toggleConnectBotModal}>
          <Modal.Header closeButton>
            <Modal.Title>Connect a bot to allow users to add themselves.</Modal.Title>
          </Modal.Header>

          <Form noValidate validated={this.state.validated}>
            <Modal.Body>
              <Form.Row>
                <Col xs={6}>
                  <Form.Group controlId="twitchConnection">
                    <Form.Label>Connect to Twitch Stream</Form.Label>
                    <Form.Control type="text" defaultValue={this.sessionFormInfo.streamName} onChange={this.updateTwitchStream} />
                    <Form.Text className="text-muted">Twitch stream name in url.</Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="discordConnection">
                    <Form.Label>Connect to Discord Server</Form.Label>
                    <Form.Control type="text" defaultValue={this.sessionFormInfo.discordGuildId} onChange={this.updateDiscordId} />
                    <Form.Text className="text-muted">Server id from discord.</Form.Text>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.toggleConnectBotModal}>Close</Button>
              <Button variant="primary" onClick={this.connectBot} >Add bot(s)</Button>
            </Modal.Footer>
          </Form>
        </Modal>


        <Modal show={this.props.showRemoveSessionConfirmationModal} onHide={this.props.toggleRemoveSessionConfirmationModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to close this session?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleRemoveSessionConfirmationModal}>Cancel</Button>
            <Button variant="danger" onClick={this.removeSession} >Close Session</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default SessionFormModal;