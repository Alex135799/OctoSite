import React, { Component } from 'react';
import { Alert, Button, Container } from "react-bootstrap";
import SessionFormModal from "./SessionFormModal";
import SessionActions from './SessionActions';

class SessionInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      session: this.props.queue.session,
      queueActions: this.props.queueActions,
      showCreateSessionModal: false,
      showRemoveSessionConfirmationModal: false,
      showConnectBotModal: false
    }
  }

  toggleSessionModal = () => {
    let newShowCreateSessionModal = !this.state.showCreateSessionModal;
    this.setState({
      user: this.state.user,
      session: this.state.session, 
      showRemoveSessionConfirmationModal: this.state.showRemoveSessionConfirmationModal,
      showConnectBotModal: this.state.showConnectBotModal,
      showCreateSessionModal: newShowCreateSessionModal
    });
  }

  toggleRemoveSessionConfirmationModal = () => {
    let newShowRemoveSessionConfirmationModal = !this.state.showRemoveSessionConfirmationModal;
    this.setState({
      session: this.state.session, 
      user: this.state.user, 
      showCreateSessionModal: this.state.showCreateSessionModal,
      showConnectBotModal: this.state.showConnectBotModal,
      showRemoveSessionConfirmationModal: newShowRemoveSessionConfirmationModal 
    });
  }

  toggleConnectBotModal = () => {
    let newShowConnectBotModal = !this.state.showConnectBotModal;
    this.setState({
      session: this.state.session, 
      user: this.state.user, 
      showCreateSessionModal: this.state.showCreateSessionModal, 
      showRemoveSessionConfirmationModal: this.state.newShowRemoveSessionConfirmationModal,
      showConnectBotModal: newShowConnectBotModal
    });
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
        <Alert variant="danger" id="sessionAlert" hidden={!this.props.queue.session.error}>
          {this.props.queue.session.error}
        </Alert>
        <Container className="container session" id="noSessionInfoRoot" hidden={this.props.queue.session.sessionId}>
          <Alert variant="dark" id="sessionAlert">
            Choose session.&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={this.toggleSessionModal} hidden={!this.isUserAdmin()}>Create Session</Button>
          </Alert>
        </Container>
        <Container className="container session" id="sessionInfoRoot" hidden={!this.props.queue.session.sessionId}>
          <Alert variant="dark" id="sessionAlert">
            <SessionActions 
              isUserAdmin={!this.isUserAdmin()}
              queue={this.props.queue}
              queueActions={this.state.queueActions}
              toggleSessionModal={this.toggleSessionModal}
              toggleRemoveSessionConfirmationModal={this.toggleRemoveSessionConfirmationModal}
              toggleConnectBotModal={this.toggleConnectBotModal}
              isShowingToEnter={this.props.isShowingToEnter}
              toggleShowToEnter={this.props.toggleShowToEnter} />
            <p>
              {this.props.queue.session.player} Currently playing:
            </p>
            {this.props.queue.session.name}
          </Alert>
        </Container>

        <SessionFormModal
          session={this.props.queue.session}
          queueActions={this.state.queueActions}
          showCreateSessionModal={this.state.showCreateSessionModal}
          showConnectBotModal={this.state.showConnectBotModal}
          showRemoveSessionConfirmationModal={this.state.showRemoveSessionConfirmationModal}
          toggleSessionModal={this.toggleSessionModal}
          toggleRemoveSessionConfirmationModal={this.toggleRemoveSessionConfirmationModal}
          toggleConnectBotModal={this.toggleConnectBotModal}
          userId={this.getUserId()} />
      </div>
    )
  }
}

export default SessionInfo;