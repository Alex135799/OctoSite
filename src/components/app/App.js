import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from '../navbar/Navbar'
import Home from '../home/Home'
import Sim from '../pull_sim/Sim'
import Queue from '../queue/Queue'
import Calendar from '../calendar/Calendar'
import Login from '../login/Login'

import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: "home"
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Route exact={true} path="/" component={Navbar} />
              <Route path="/:currentPage" render={({ match }) => (
                <Navbar currentPage={match.params.currentPage} />
              )} />
            </header>
            <div id="body" className="App-body">
              <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/pull_sim" component={Sim} />
                <Route path="/queue" component={Queue} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/login/:redirectPath" render={({ match, location }) => (
                  <Login redirectPath={match.params.redirectPath} hash={location.hash} />
                )} />
                <Route path="/login" render={({ match, location }) => (
                  <Login redirectPath="" hash={location.hash} />
                )} />

                <Route component={Home} />
              </Switch>
            </div>
            <footer className="App-footer" />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
