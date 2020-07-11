import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from '../navbar/Navbar'
import Home from '../home/Home'
import Sim from '../pull_sim/Sim'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "home"
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact={true} path="/" component={Navbar} />
            <Route path="/:currentPage" render={({ match }) => (
              <Navbar currentPage={match.params.currentPage} />
            )} />
          </header>
          <body className="App-body">
            <Route exact={true} path="/" component={Home} />
            <Route path="/pull_sim" component={Sim} />
          </body>
          <footer className="App-footer" />
        </div>
      </Router>
    );
  }
}

export default App;
