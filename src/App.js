import React, { Component } from 'react';
import logo from './hanuka_blast.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-desc">
            <p>
              This isn't even Octo's final form!
              <br />
              <a
                className="App-link"
                href="https://www.twitch.tv/smellyoctopus"
                target="_blank"
                rel="noopener"
              >
                Discover your inner Octopus.
              </a>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
