import React, { Component } from 'react';
import { Container } from "react-bootstrap";
import * as queueActions from '../../actions/queueActions';
import SessionInfo from './SessionInfo';
import { backendUrl, octoChannelId, websocketUrl } from "../../common/constants/stringConstants"
import './Queue.css';
import axios from "axios";
import * as ws from "websocket";
import LoadingEntryTable from "./table/LoadingEntryTable"
import LoadingSessionTable from "./table/LoadingSessionTable"
import EmptyEntryTable from "./table/EmptyEntryTable"
import EmptySessionTable from "./table/EmptySessionTable"
import SessionTable from "./table/SessionTable"
import EntryTable from "./table/EntryTable"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Queue extends Component {
  constructor(props) {
    super(props);

    window.addEventListener("resize", this.changeTableHeight);

    this.state = {
      socketConnectionSetUp: false,
      socketConnectionToggledOff: false,
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: 0,
      sesionInfoHeight: 0,
      isShowingToEnter: true,
      isCherryPickingOn: false
    }

    this.initiallyLoadingQueue = false;
    this.initiallyLoadingSessions = false;
    this.tableFillRatio = .7;
    this.primaryElementName = "sessionInfoRoot";
    this.secondaryElementName = "noSessionInfoRoot";
    this.client = {};
  }

  toggleShowToEnter = () => {
    this.setState({
      socketConnectionSetUp: this.state.socketConnectionSetUp,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff,
      user: this.state.user,
      queue: this.state.queue,
      tableHeight: this.state.tableHeight,
      sesionInfoHeight: this.state.sesionInfoHeight,
      isShowingToEnter: !this.state.isShowingToEnter,
      isCherryPickingOn: this.state.isCherryPickingOn
    });
  }

  toggleCherryPick = () => {
    this.setState({
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: this.state.tableHeight,
      sesionInfoHeight: this.state.sesionInfoHeight,
      socketConnectionSetUp: this.state.socketConnectionSetUp,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff,
      isShowingToEnter: this.state.isShowingToEnter,
      isCherryPickingOn: !this.state.isCherryPickingOn
    })
  }

  toggleWebSocket = () => {
    if (this.state.socketConnectionSetUp) {
      this.client.close();
      this.setState({
        socketConnectionSetUp: false,
        socketConnectionToggledOff: true,
        user: this.props.user,
        queue: this.props.queue,
        tableHeight: this.state.tableHeight,
        sesionInfoHeight: this.state.sesionInfoHeight,
        isShowingToEnter: this.state.isShowingToEnter,
        isCherryPickingOn: this.state.isCherryPickingOn
      });
    }
    else {
      this.setupWebSocket(this.props.queueActions);
    }
  }

  setupWebSocket = (queueActions) => {
    this.client = new ws.w3cwebsocket(websocketUrl);

    this.client.onerror = function(err) {
      console.log("WebSocket Connection Error");
    }
    this.client.onopen = function(msg) {
      console.log("WebSocket Connected");
    }
    this.client.onclose = function(msg) {
      console.log("WebSocket Closed");
      this.socketConnectionSetUp = false;
    }
    this.client.onmessage = function(message) {
      let messageData = JSON.parse(message.data);
      if (messageData.action && messageData.action === "add") {
        queueActions.addToQueue([messageData]);
      } else if (messageData.action && messageData.action === "remove") {
        queueActions.removeFromQueue([messageData]);
      }
    }

    this.setState({
      socketConnectionSetUp: true,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff,
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: this.state.tableHeight,
      sesionInfoHeight: this.state.sesionInfoHeight,
      isShowingToEnter: this.state.isShowingToEnter,
      isCherryPickingOn: this.state.isCherryPickingOn
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let sesionInfoHeight = document.getElementById(this.primaryElementName).clientHeight;
    if (prevState.sesionInfoHeight !== sesionInfoHeight) {
      this.changeTableHeight();
    }
  }

  componentDidMount() {
    this.changeTableHeight();
    if (!this.state.socketConnectionSetUp && !this.state.socketConnectionToggledOff) {
      this.setupWebSocket(this.props.queueActions);
    }
  }

  changeTableHeight = () => {
    let sesionInfoHeight = document.getElementById(this.primaryElementName).clientHeight;
    let windowHeight = window.innerHeight;
    let availableHeight = windowHeight - sesionInfoHeight;
    let tableHeight = availableHeight * this.tableFillRatio;
    this.setState({
      user: this.props.user,
      queue: this.props.queue,
      tableHeight: tableHeight,
      sesionInfoHeight: sesionInfoHeight,
      socketConnectionSetUp: this.state.socketConnectionSetUp,
      socketConnectionToggledOff: this.state.socketConnectionToggledOff,
      isShowingToEnter: this.state.isShowingToEnter,
      isCherryPickingOn: this.state.isCherryPickingOn
    });
  }

  loadSessionEntries(sessionId) {
    this.initiallyLoadingQueue = true;
    axios.get(backendUrl + "queue/entry?sessionId=" + sessionId).then((response) => {
      this.props.queueActions.replaceQueue(response.data.Items)
    });
  }

  loadSessionOptions(channelId) {
    this.initiallyLoadingSessions = true;
    axios.get(backendUrl + "queue?streamName=" + channelId + "&reverse=true").then((response) => {
      this.props.queueActions.addSessionOptions(response.data.Items)
    });
  }

  isUserAdmin = () => {
    if (!this.props.user.loggedIn) {
      return false;
    }
    return this.props.user.accessInfo["cognito:groups"].includes("OoglopBot_QueueAdmin");
  }

  decideTableToUse() {
    if (this.props.queue.session.sessionId) {
      if (!this.initiallyLoadingQueue) {
        this.loadSessionEntries(this.props.queue.session.sessionId);
        return <LoadingEntryTable 
                      toggleWebSocket={this.toggleWebSocket} 
                      socketConnectionSetUp={this.state.socketConnectionSetUp} 
                      queue={this.props.queue} />
      }
      else if ((this.props.queue.list.length === 0 && this.state.isShowingToEnter) ||
              (this.props.queue.inactiveList.length === 0 && !this.state.isShowingToEnter)) {
        return <EmptyEntryTable 
                      toggleWebSocket={this.toggleWebSocket} 
                      socketConnectionSetUp={this.state.socketConnectionSetUp} 
                      queue={this.props.queue} />
      }
      else {
        return <EntryTable 
                      toggleWebSocket={this.toggleWebSocket} 
                      socketConnectionSetUp={this.state.socketConnectionSetUp}
                      queue={this.props.queue}
                      showToEnter={this.state.isShowingToEnter}
                      isUserAdmin={!this.isUserAdmin()}
                      isCherryPickingOn={this.state.isCherryPickingOn}
                      queueActions={this.props.queueActions} />
      }
    } else {
      if (!this.initiallyLoadingSessions) {
        this.loadSessionOptions(octoChannelId);
        return <LoadingSessionTable />
      }
      else if (this.props.queue.sessionOptions.length === 0) {
        return <EmptySessionTable />
      }
      else {
        return <SessionTable queue={this.props.queue} queueActions={this.props.queueActions} />
      }
    }
  }

  render() {
    let tableToUse = this.decideTableToUse();
    
    //TODO: Come up with solution to table height sometimes after sessions are not loaded, so refresh is needed.
    //      Maybe something to do with using props vs state?
    return (
      <Container id="queueRoot">
        <SessionInfo queue={this.props.queue} queueActions={this.props.queueActions} user={this.props.user} 
                     isShowingToEnter={this.state.isShowingToEnter} toggleShowToEnter={this.toggleShowToEnter}
                     isUserAdmin={!this.isUserAdmin()} toggleCherryPick={this.toggleCherryPick}
                     isCherryPickingOn={this.state.isCherryPickingOn} />
        <div className="scroll-table" style={this.state.tableHeight !== 0 ? { height: this.state.tableHeight } : {}} >
          {tableToUse}
        </div>
      </Container>
    )
  }
}

Queue.propTypes = {
  queueActions: PropTypes.object,
  queue: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps(state) {
  return {
    queue: state.queue,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    queueActions: bindActionCreators(queueActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);