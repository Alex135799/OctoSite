import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { cognitoUrl } from "../../common/constants/stringConstants";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as loginActions from '../../actions/userActions';

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

  render() {
    return (
      <Button variant="secondary" onClick={this.login} disabled={this.props.user.loggedIn}>Login</Button>
    );
  }
}

NavLogin.propTypes = {
  loginActions: PropTypes.object,
  user: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLogin);
