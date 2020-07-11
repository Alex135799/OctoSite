import React, { Component } from 'react';
import TimePicker from 'react-simple-timefield';
import CalendarError from './CalendarError'
import CalendarWarning from './CalendarWarning'
import { copyForm } from '../../common/copy_objects/copyCalendar.js';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class CalendarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: this.props.form,
      toggleShow: this.props.toggleShow
    }

    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);
  }

  startTimeChanged(context, time) {
    let formCopy = copyForm(this.state.form);

    if (time > this.state.form.event.end) {
      formCopy.warning = "Please change start time to be before end time.";
    }
    else {
      formCopy.warning = null;
    }

    formCopy.event.start = time;
    this.setState({ form: formCopy });
  }

  endTimeChanged(context, time) {
    let formCopy = copyForm(this.state.form)

    if (time < this.state.form.event.start) {
      formCopy.warning = "Please change end time to be after start time.";
    }
    else {
      formCopy.warning = null;
    }

    formCopy.event.end = time;
    this.setState({ form: formCopy });
  }

  submitForm() {
    return null;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.state.toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <CalendarError error={this.state.form.error} />
            <CalendarWarning warning={this.state.form.warning} />

            <div className="form-group row justify-content-center">
              <label className="col-md-6 col-sm-12 col-12">Title:</label>
              <input type="text" name="title" className="col-md-6 col-sm-12 col-10" required="required" value={this.state.form.event.title} />
            </div>

            <div className="form-group row justify-content-center">
              <label className="col-12 col-sm-6 col-md-3">Start:</label>
              <TimePicker name="start" className="col-10 col-sm-6 col-md-3" value={this.state.form.event.start} onChange={this.startTimeChanged} />

              <label className="col-12 col-sm-6 col-md-3">End:</label>
              <TimePicker name="end" className="col-10 col-sm-6 col-md-3" value={this.state.form.event.end} onChange={this.endTimeChanged} />
            </div>

            <div className="form-group row justify-content-center">
              <label>
                All Day?&nbsp;&nbsp;
            <input name="allDay" type="checkbox" value={this.state.form.event.allDay} />
              </label>
            </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.state.toggleShow}>Close</Button>
          <Button variant="primary" onClick={this.state.submitForm}>Save changes</Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

export default CalendarForm;