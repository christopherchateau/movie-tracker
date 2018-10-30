import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  logIn,
  setErrorMessage,
  resetFavorites,
  displayFavorites
} from "../../actions";
import "./NavBar.css";

export const NavBar = props => {
  let favoritesBtnText;
  props.showFavorites
    ? (favoritesBtnText = "Show all")
    : (favoritesBtnText = "My Favorites");

  if (!props.loggedIn) {
    return (
      <div>
        <nav onClick={() => props.handleErrorMessage("")} className="navBar">
          <NavLink className="sign-in-button buttons" to="/login">
            Sign In
          </NavLink>
          <NavLink className="sign-up-button buttons" to="/signup">
            Sign Up
          </NavLink>
        </nav>
        <section>
          <p className="error-msg">{props.errorMessage}</p>
        </section>
      </div>
    );
  } else {
    return (
      <nav className="navBar">
        <NavLink
          className="favorites-button buttons"
          to={props.showFavorites ? "/" : "/favorites"}
          onClick={() => props.handleDisplayFavorites(!props.showFavorites)}
        >
          {favoritesBtnText}
        </NavLink>
        <h1 className="user-name">Hello {props.currentUser.name}!</h1>
        <NavLink
          className="sign-out-button buttons"
          to="/"
          onClick={() => {
            props.handleLogin(false);
            props.handleResetFavorites();
            props.handleDisplayFavorites(false);
            localStorage.setItem(
              "coenCollection",
              JSON.stringify({ loggedIn: false, email: "", password: "" })
            );
          }}
        >
          Sign Out
        </NavLink>
      </nav>
    );
  }
};

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  currentUser: state.currentUser,
  errorMessage: state.errorMessage,
  showFavorites: state.showFavorites
});

export const mapDispatchToProps = dispatch => ({
  handleLogin: bool => dispatch(logIn(bool)),
  handleErrorMessage: message => dispatch(setErrorMessage(message)),
  handleResetFavorites: () => dispatch(resetFavorites()),
  handleDisplayFavorites: bool => dispatch(displayFavorites(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  showFavorites: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  handleResetFavorites: PropTypes.func.isRequired,
  handleDisplayFavorites: PropTypes.func.isRequired
}
