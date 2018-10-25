import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = props => {
  if (!props.loggedIn) {
    return (
      <div className="navBar">
        <NavLink className="sign-in-button buttons" to="/login">
          Sign In
        </NavLink>
        <NavLink className="sign-up-button buttons" to="/signup">
          Sign Up
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="navBar">
        <h1>Hello</h1>
        <button>Sign Out</button>
      </div>
    );
  }
};

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(NavBar);
