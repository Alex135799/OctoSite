import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavbarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
    }
  }

  render() {
    if (this.state.currentPage !== "pull_sim") {
      return (
        <Nav>
          <Nav.Link className="enabled">
            <Link to={'/pull_sim'}>
              Pull Sim
            </Link>
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link className="disabled">Pull Sim</Nav.Link>
        </Nav>
      )
    }
  }
}

export default NavbarList;
