import React, { Component } from 'react';
import logo from '../../assets/hanuka_blast.png';
import yt_icon from '../../assets/youtube_icon.svg';
import twitch_icon from '../../assets/twitch_icon.svg';
import instagram_icon from '../../assets/instagram_icon.svg';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-desc">
            This isn't even Octo's final form!
            <br />
            <p className="underline">
              Discover your inner Octopus below.
            </p>
          <Container className="logos">
            <Row>
            <Col className="logo">
              <a
                className="App-link"
                href="https://www.twitch.tv/smellyoctopus"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src={twitch_icon} className="twitch-logo" alt="twitch-logo" />
              </a>
            </Col>
            <Col className="logo" >
              <a
                className="App-link"
                href="https://www.youtube.com/user/Smelly0ctopus"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src={yt_icon} className="youtube-logo" alt="youtube-logo" />
              </a>
            </Col>
            <Col className="logo">
              <a
                className="App-link"
                href="https://www.instagram.com/smellyocto/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src={instagram_icon} className="instagram-logo" alt="instagram-logo" />
              </a>
            </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
