import React, { Component } from 'react';
import CalendarError from './CalendarError'
import CalendarWarning from './CalendarWarning'
import CalendarForm from './CalendarForm'
import './Calendar.css';
import * as calendarActions from '../../actions/calendarActions';
import { Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Calendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      calendar: this.props.calendar,
      form: this.props.calendar.form,
      show: false
    }

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({
      calendar: this.state.calendar, 
      form: this.state.form, 
      show: !this.state.show
    })
  }

  render() {
    return (
      <div className="container" id="calendarRoot">
        <CalendarError error={this.state.form.error} />
        <CalendarWarning warning={this.state.form.warning} />

        <Button variant="primary" onClick={this.toggleShow}>
          Launch Demo Modal
        </Button>

        <CalendarForm form={this.state.form} show={this.state.show} toggleShow={this.toggleShow}/>

      </div>
    )
  }
}

Calendar.propTypes = {
  calendarActions: PropTypes.object,
  calendar: PropTypes.object
}

function mapStateToProps(state) {
  return {
    calendar: state.calendar
  };
}

function mapDispatchToProps(dispatch) {
  return {
    calendarActions: bindActionCreators(calendarActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);