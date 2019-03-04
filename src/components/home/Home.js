import React, { Component } from 'react';
import logo from '../../assets/hanuka_blast.png';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-desc">
          <p>
            This isn't even Octo's final form!
            <br />
            <a
              className="App-link"
              href="https://www.twitch.tv/smellyoctopus"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover your inner Octopus.
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;