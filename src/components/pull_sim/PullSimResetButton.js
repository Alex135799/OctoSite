import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PullSimResetButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPulls: this.props.totalPulls,
      totalWins: this.props.totalWins,
      onClick: this.props.onClick
    }
  }

  render() {
    if (this.props.totalPulls === 0) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset the Counters</Button>
    }
    else if (this.props.totalWins * 100 / this.props.totalPulls > 100) {
      return <Button variant="dark" onClick={this.props.onClick}>You win! Quit while you still can!</Button>
    }
    else if (this.props.totalWins * 100 / this.props.totalPulls > 75) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset the decent Counters</Button>
    }
    else if (this.props.totalWins * 100 / this.props.totalPulls > 50) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset the respectable Counters</Button>
    }
    else if (this.props.totalWins * 100 / this.props.totalPulls > 0) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset the shameful Counters</Button>
    }
    else if (this.props.totalPulls > 100) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset these Counters, they are making me cry</Button>
    }
    else if (this.props.totalPulls > 1000) {
      return <Button variant="dark" onClick={this.props.onClick}>Reset these Counters, I can't even see through the tears</Button>
    }
    else {
      return <Button variant="dark" onClick={this.props.onClick}>Reset the Counters</Button>
    }
  }
}

export default PullSimResetButton;
