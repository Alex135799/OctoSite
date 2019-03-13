import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react'
import * as winTypes from '../../common/winTypes';
import logo from '../../assets/logo.svg';

class PullAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winType: this.props.winType
    }
  }

  getNumberOfStars() {
    switch (this.props.winType) {
      case winTypes.FIVE_STARS:
        return 5;
      case winTypes.FOUR_STARS:
        return 4;
      case winTypes.THREE_STARS:
        return 3;
      case winTypes.TWO_STARS:
        return 2;
      case winTypes.ONE_STAR:
        return 1;
      default:
        return 0;
    }
  }

  getStars() {
    let numberOfStars = this.getNumberOfStars();
    let stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      let delay= 1000 * i;
      if (i >= 3) {
        delay -= 1000;
      }
      let xPos= -25 + i * 12.5;
      xPos=xPos+"vw"
      stars.push(
      <VelocityComponent
        runOnMount={true}
        duration={1500}
        delay={delay}
        animation={{
          translateX: [xPos, 0]
        }}>

        <img src={logo} className="star" alt="star" />

        </VelocityComponent>
      );
    }
    return stars;
  }

  render() {
    let stars = this.getStars();
    return (
      <div className="stars">
        {stars}
      </div>
    );
  }
}

export default PullAnimation;
