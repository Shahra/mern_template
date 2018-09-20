import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authentication';


class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const notActive = { color: 'gray' };
    const active = { color: 'black' };

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <NavLink
            className="nav-link"
            style={notActive}
            activeStyle={active}
            onClick={this.onLogout}
            to="/"
            >
            <img
              src={user.avatar}
              alt={user.name}
              title={user.name}
              className="rounded-circle"
              style={{width: '25px', marginRight: '5px'}}
            />
            Logout
          </NavLink>
        </li>
      </ul>
    );

    const guestLinks = (
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
    );

    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">React Node Simple App</NavLink>
        <div className="collapse navbar-collapse">
          { isAuthenticated ? authLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })
  (withRouter(Navbar));
