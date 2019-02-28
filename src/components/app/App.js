import React, { Component } from 'react';
import logo from '../../assets/hanuka_blast.png';
import './App.css';
import Navbar from '../navbar/Navbar'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "home"
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar currentPage={this.state.currentPage}/>
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
        </header>
      </div>
    );
  }
}

export default App;
