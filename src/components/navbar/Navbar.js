import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/favicon.ico';
import NavLogin from './NavLogin';
import NavbarList from './NavbarList';

class _Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPage
    }
  }

  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <img src={logo} width="30" height="30" alt="" />
          </Link>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            &nbsp;&nbsp;{'OctoSite'}
          </Link>
        </Navbar.Brand>

        <NavLogin currentPage={this.props.currentPage}/>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <NavbarList currentPage={this.props.currentPage}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default _Navbar;
