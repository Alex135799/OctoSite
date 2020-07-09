import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

class NavbarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
    }
  }

  getIsEnabledClass(pagePath) {
    if (this.props.currentPage !== pagePath) {
      return "enabled";
    }
    return "disabled";
  }

  render() {
    let pullSimEnabledClass = this.getIsEnabledClass("pull_sim");
    let queueEnabledClass = this.getIsEnabledClass("queue");
    
    return (
      <Nav variant="pills">
        <Nav.Link href={'/pull_sim'} className={pullSimEnabledClass}>
            Pull Sim
        </Nav.Link>
        <Nav.Link href={'/queue'} className={queueEnabledClass}>
          Game Queue
        </Nav.Link>
      </Nav>
    );
  }
}

export default NavbarList;
