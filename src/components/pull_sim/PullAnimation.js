import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react'
import logo from '../../assets/logo.svg';

class PullAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winType: this.props.winType
    }
  }

  render() {
    return (
      <VelocityComponent
        runOnMount={true}
        duration={2000}
        animation={{
          translateX: [0, 1000]
        }}>

        <img src={logo} className="star" alt="star" />

      </VelocityComponent>
    );
  }
}

export default PullAnimation;
