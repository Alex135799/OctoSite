import React, { Component } from 'react';
import logo from '../../assets/favicon.ico';
import NavbarList from './NavbarList';

class Navbar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentPage: this.props.currentPage
    }
  }

  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src={logo} width="30" height="30" alt="" />
            &nbsp;&nbsp;&nbsp;OctoSite
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavbarList currentPage={this.state.currentPage}/>
        </nav>
      </div>
    );
  }
}

export default Navbar;
