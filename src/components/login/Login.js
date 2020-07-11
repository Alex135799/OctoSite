import * as loginActions from "../../actions/userActions";
import React, { Component } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);

    let idToken = queryString.parse(this.props.hash).id_token;
    let accessToken = queryString.parse(this.props.hash).access_token;

    this.state = {
      idToken: idToken,
      accessToken: accessToken,
      redirectPath: "/" + this.props.redirectPath
    }
  }

  render() {
    this.props.loginActions.login(this.state.idToken, this.state.accessToken);
    return (
      <Redirect to={this.state.redirectPath} />
    );
  }
}

Login.propTypes = {
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
)(Login);