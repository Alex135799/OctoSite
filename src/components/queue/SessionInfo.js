import React, { Component } from 'react';
import { Alert, Button, Container } from "react-bootstrap";
import SessionFormModal from "./SessionFormModal";
import { copySession } from "../../common/copy_objects/copyQueue";

class SessionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      session: this.props.session,
      queueActions: this.props.queueActions,
      showCreateSessionModal: false
    }

    this.toggleSessionModal = this.toggleSessionModal.bind(this);
  }

  toggleSessionModal() {
    let newShowCreateSessionModal = !this.state.showCreateSessionModal;
    let sessionCopy = copySession(this.state.session);
    this.setState({ session: sessionCopy, showCreateSessionModal: newShowCreateSessionModal });
  }

  isUserAdmin = () => {
    if (!this.props.user.loggedIn) {
      return false;
    }
    return this.props.user.accessInfo["cognito:groups"].includes("OoglopBot_QueueAdmin");
  }

  getUserId = () => {
    if (this.props.user.loggedIn) {
      return this.props.user.idInfo.sub;
    }
    return "user not logged in.";
  }

  render() {
    return (
      <div>
        <Alert variant="danger" id="sessionAlert" hidden={!this.props.session.error}>
          {this.props.session.error}
        </Alert>
        <Container className="container session" id="sessionInfoRoot" hidden={this.props.session.id}>
          <Alert variant="dark" id="sessionAlert">
            No active session.&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={this.toggleSessionModal} hidden={!this.isUserAdmin()}>Create Session</Button>
          </Alert>
        </Container>
        <Container className="container session" id="sessionInfoRoot" hidden={!this.props.session.id}>
          <Alert variant="dark" id="sessionAlert">
            <p>
              {this.props.session.player} currently playing:
            </p>
            {this.props.session.name}
          </Alert>
        </Container>

        <SessionFormModal
          session={this.props.session}
          queueActions={this.state.queueActions}
          showCreateSessionModal={this.state.showCreateSessionModal}
          toggleSessionModal={this.toggleSessionModal}
          userId={this.getUserId()} />
      </div>
    )
  }
}

export default SessionInfo;