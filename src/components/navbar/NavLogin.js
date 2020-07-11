import React, { Component } from 'react';
import { Button, NavDropdown, Nav } from 'react-bootstrap';
import { cognitoUrl } from "../../common/constants/stringConstants";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/userActions';

class NavLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      user: this.props.user
    }
  }

  login = () => {
    let currentPagePath = this.props.currentPage ? "/" + this.props.currentPage : "";
    let cognitoUrlWithPath = cognitoUrl + currentPagePath;
    window.location = cognitoUrlWithPath;
  }

  logout = () => {
    this.props.userActions.logout();
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        <Nav>
          <NavDropdown title={this.props.user.loggedIn ? this.props.user.idInfo["cognito:username"] : null} id="nav-user-dropdown">
            <NavDropdown.Item onClick={this.logout} >Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
    else {
      return (
        <Button variant="secondary" onClick={this.login}>Login</Button>
      );
    }
  }
}

NavLogin.propTypes = {
  userActions: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLogin);
