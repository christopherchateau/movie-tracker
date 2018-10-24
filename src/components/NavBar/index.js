import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

const NavBar = (props) => {
    if (!props.loggedIn) {
  return(
    <div>
      <NavLink 
        className='sign-in-button'
        to='/login'
        >
          Sign In
      </NavLink>
      <NavLink 
        className='sign-up-button'
        to='/signup'
        >
          Sign Up
      </NavLink>
    </div>
  )
 } else {
  return (
    <div>
      <h1>Hello</h1>
      <button>Sign Out</button> 
    </div> 
  )
 }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
})

export default connect(mapStateToProps)(NavBar)