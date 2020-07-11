import React, { Component } from 'react';

class CalendarWarning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: this.props.warning
    }
  }

  render() {
    if (this.props.warning) {
      return (
        <div role="alert" className="alert alert-warning text-center">
          {this.props.warning}
        </div>
      );
    }
    return <div/>
  }
}

export default CalendarWarning;