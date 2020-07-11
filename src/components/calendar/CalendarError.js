import React, { Component } from 'react';

class CalendarError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error
    }
  }

  render() {
    if (this.props.error) {
      return (
        <div role="alert" ng-show="vm.formError" className="alert alert-danger text-center">
          {this.props.error}
        </div>
      );
    }
    return <div/>
  }
}

export default CalendarError;