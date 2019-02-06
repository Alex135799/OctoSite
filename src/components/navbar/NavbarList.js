import React, { Component } from 'react';

class NavbarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
    }
  }

  render() {
    if (this.state.currentPage !== "pullsim") {
      return (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Pull Sim </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Pull Sim </a>
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default NavbarList;
