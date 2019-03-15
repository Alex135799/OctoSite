import React, { Component } from 'react';
import logo from '../../assets/hanuka_blast.png';
import yt_icon from '../../assets/youtube_icon.svg';
import twitch_icon from '../../assets/twitch_icon.svg';

class Home extends Component {

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-desc">
          <p>
            This isn't even Octo's final form!
            <br />
            <p className="underline">
              Discover your inner Octopus.
            </p>
          </p>
          <div className="logos">
            <div className="logo">&nbsp;</div>
            <div className="logo">
              <a
                className="App-link"
                href="https://www.twitch.tv/smellyoctopus"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src={twitch_icon} className="twitch-logo" alt="twitch-logo" />
              </a>
            </div>
            <div className="logo" >
              <a
                className="App-link"
                href="https://www.youtube.com/user/Smelly0ctopus"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src={yt_icon} className="youtube-logo" alt="youtube-logo" />
              </a>
            </div>
            <div className="logo">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
