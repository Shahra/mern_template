import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const notActive = { color: 'gray' };
    const active = { color: 'black' };

    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">React Node Simple App</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink
                className="nav-link"
                style={notActive}
                activeStyle={active}
                to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={notActive}
                activeStyle={active}
                to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
// <NavLink className="nav-link" to="/register">Register</NavLink>
